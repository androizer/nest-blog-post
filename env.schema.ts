import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumberString()
  TYPEORM_PORT: string = '5432';

  @IsNotEmpty()
  @IsNumberString()
  PORT: string = '3000';

  @IsString()
  @IsNotEmpty()
  // comma separated values
  COOKIE_SECRETS: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_ISSUER: string = 'nestjs';

  @IsString()
  ACCESS_TOKEN_EXPIRE: string = '15m';

  @IsString()
  REFRESH_TOKEN_EXPIRE: string = '7d';

  @IsString()
  COOKIE_EXPIRE: string = '7d';

  @IsString()
  @IsNotEmpty()
  // comma separated values
  CORS_ORIGINS: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_DB_TYPE: string = 'postgres';

  @IsString()
  @IsNotEmpty()
  TYPEORM_HOST: string = 'localhost';

  @IsString()
  @IsNotEmpty()
  TYPEORM_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_PWD: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_DB: string;
}
