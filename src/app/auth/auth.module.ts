import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTConfigService } from '../../config/jwt-config.service';

import { SharedModule } from '../shared/shared.module';
import { UserEntity } from '../user/models';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers';
import { RefreshTokenEntity } from './models/entities';
import { AuthService, JwtStrategy } from './service';
import { LocalStrategy } from './service/strategies';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    UserModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
