import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { classToClass, plainToClass } from 'class-transformer';
import { CookieOptions } from 'express';
import ms from 'ms';
import { Repository } from 'typeorm';

import AuthConfig from '../../../../config/auth.config';
import { uuid } from '../../../shared/types';
import { User } from '../../../user/models';
import { UserService } from '../../../user/services';
import { RefreshTokenEntity } from '../../models/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshRepo: Repository<RefreshTokenEntity>,
    @Inject(AuthConfig.KEY) private authConfig: ConfigType<typeof AuthConfig>,
  ) {}

  /**
   * Validate if the user credentials exists & match in the system while logging
   * @param email email address
   * @param pwd password
   * @returns User | null
   */
  public async validateUser(email: string, pwd: string): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { email },
    });
    if (user) {
      const matched = await compare(pwd, user.password);
      if (matched) {
        return classToClass(user);
      }
    }
    return null;
  }

  /**
   * Generate accessToken & refreshToken while logging in
   * @param user User extracted from request object.
   * @returns Access Token and Refresh Token
   */
  public async login(user: Express.User) {
    const { accessTokenExp } = this.authConfig;
    return {
      accessToken: this.generateAccessToken(user as User),
      refreshToken: await this.generateRefreshToken(user as User),
      expiresIn: new Date(new Date().getTime() + ms(accessTokenExp)).getTime(),
    };
  }

  /**
   * Logout the user by deleting its refresh token entity
   * @param user User extracted from request object.
   */
  public async logout(user: User) {
    // delete token entity
    await this.refreshRepo.softDelete(user.id);
  }

  /**
   * Check if user already exists in the system while registering.
   * @param userDto RegisterDTO
   * @returns User | ConflictException
   */
  public async register(userDto: Partial<User>) {
    const isUserExist = await this.userService.findOne({
      where: { email: userDto.email },
    });
    if (isUserExist) {
      throw new ConflictException('User Already Exists!');
    }
    const user = this.userService.userRepo.create(userDto);
    return this.userService.userRepo.save(user);
  }

  /**
   * Create AccessToken and RefreshToken from existing RefreshToken
   * @param refreshToken encoded token string
   * @returns
   */
  public async createRefreshAndRefreshToken(oldRefreshToken: string) {
    const { user, accessToken } = await this.generateAccessTokenFromRefreshToken(oldRefreshToken);
    const refreshToken = await this.generateRefreshToken(user);
    const { accessTokenExp } = this.authConfig;
    return {
      accessToken,
      refreshToken,
      expiresIn: new Date(new Date().getTime() + ms(accessTokenExp)).getTime(),
    };
  }

  /**
   * Revoke the token of user by deleting the refresh entity
   * @param userId uuid
   * @returns void
   */
  public async revokeToken(userId: uuid) {
    const user = plainToClass(User, { id: userId });
    return this.refreshRepo.delete({ user });
  }

  public generateCookieOptions(): CookieOptions {
    // 7 days from now
    const { cookieExp } = this.authConfig;
    return {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
      expires: new Date(Date.now() + ms(cookieExp)),
      path: '/auth/token/refresh',
    };
  }

  protected generateAccessToken(user: User): string {
    // sign options
    const config: JwtSignOptions = {
      subject: user.id,
    };
    // create jwt and return
    return this.jwtService.sign({ user }, config);
  }

  protected async generateRefreshToken(user: User, expiresIn = this.authConfig.refreshTokenExp) {
    // Check if token entity exists on the basis of user_id.
    let tokenEntity = await this.refreshRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
    // if not then create a new one.
    if (!tokenEntity) {
      const entity = this.refreshRepo.create();
      entity.user = plainToClass(User, { id: user.id });
      tokenEntity = await this.refreshRepo.save(entity);
    }
    // Sign the options
    const config: JwtSignOptions = {
      jwtid: tokenEntity.id,
      subject: user.id,
      expiresIn,
    };
    // create jwt and return
    return this.jwtService.signAsync({}, config);
  }

  protected async generateAccessTokenFromRefreshToken(encoded: string) {
    // resolve refresh token  (eg. if token is revoked? etc.)
    const { user } = await this.resolveRefreshToken(encoded);
    // generate accessToken
    const accessToken = this.generateAccessToken(user);
    return { user, accessToken };
  }

  protected async resolveRefreshToken(encodedRefreshToken: string) {
    // decode the token
    const refreshToken = (await this.jwtService.decode(encodedRefreshToken)) as any;
    // If refresh token not found
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token Malformed');
    }
    if (Math.floor(Date.now() / 1000) > refreshToken.exp) {
      throw new UnauthorizedException('Refresh Token Expired');
    }
    // find token entity
    const tokenId = refreshToken.jti;
    const token = await this.refreshRepo.findOne(tokenId, {
      relations: ['user'],
    });
    if (!token) {
      throw new UnauthorizedException('Refresh Token Not Found');
    }
    // if revoked, return unauthorized 401
    if (token.isRevoked) {
      throw new UnauthorizedException('Refresh Token Revoked');
    }
    const user = classToClass(token.user);
    return { user, token };
  }
}
