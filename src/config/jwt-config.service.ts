import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import AuthConfig from './auth.config';

export class JWTConfigService implements JwtOptionsFactory {
  constructor(@Inject(AuthConfig.KEY) private readonly authConfig: ConfigType<typeof AuthConfig>) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.authConfig.jwtSecret,
      signOptions: {
        expiresIn: this.authConfig.accessTokenExp,
        issuer: this.authConfig.jwtIssuer,
      },
    };
  }
}
