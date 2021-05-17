import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Request, Response } from 'express';

import { Cookies, CurrentUser } from '../../../shared/decorators';
import { ImageService } from '../../../shared/services';
import { User } from '../../../user/models';
import { JwtAuthGuard, LocalAuthGuard, RevokeTokenGuard } from '../../guards';
import { RegisterDTO, RevokeTokenDTO } from '../../models/dto';
import { AuthService } from '../../service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly imageService: ImageService,
  ) {}

  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('register')
  async register(@Body() dto: RegisterDTO, @UploadedFile() file: Express.Multer.File) {
    const avatar = await this.imageService.createAndSave(file);
    return this.authService.register({ ...dto, avatar });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { refreshToken, ...accessPayload } = await this.authService.login(req.user);
    const cookieOptions = this.authService.generateCookieOptions();
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.send(accessPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response, @CurrentUser() user: User) {
    this.authService.logout(user);
    const cookieOptions = this.authService.generateCookieOptions();
    // Cookie can be cleared with the same option which was used in generating it.
    res.clearCookie('refreshToken', cookieOptions);
    res.end(); // required to close the stream
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  whoAmI(@CurrentUser() user: User, @Res() res: Response, @Req() req: Request) {
    const qb = RequestQueryBuilder.create(req.query).query();
    return res.redirect(`/users/${user.id}?${qb}`);
  }

  @Get('token/refresh')
  async refreshToken(
    @Res() res: Response,
    @Cookies({ key: 'refreshToken', signed: true }) oldRefreshToken?: string,
  ) {
    // generate accessToken & refreshToken
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Refresh Token Malformed');
    }
    const { refreshToken, ...accessPayload } = await this.authService.createRefreshAndRefreshToken(
      oldRefreshToken,
    );
    const cookieOptions = this.authService.generateCookieOptions();
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.send(accessPayload);
  }

  /**
   * Only admins can invoke this api or the
   * user himself who is revoking its token.
   */
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, RevokeTokenGuard)
  @Patch('token/revoke')
  revokeToken(@Body() dto: RevokeTokenDTO) {
    return this.authService.revokeToken(dto.userId);
  }
}
