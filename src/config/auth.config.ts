import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  cookieSecrets: process.env.COOKIE_SECRETS?.split(',') || [],
  cookieExp: process.env.COOKIE_EXPIRE,
  jwtSecret: process.env.JWT_SECRET,
  jwtIssuer: process.env.JWT_ISSUER,
  // needs to be vercel/ms complaint
  accessTokenExp: process.env.ACCESS_TOKEN_EXPIRE,
  refreshTokenExp: process.env.REFRESH_TOKEN_EXPIRE,
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [],
}));
