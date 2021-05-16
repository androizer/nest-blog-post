import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PWD,
  database: process.env.TYPEORM_DB,
}));
