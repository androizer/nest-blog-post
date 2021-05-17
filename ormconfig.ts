import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions[] = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PWD,
    database: process.env.TYPEORM_DB,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/entities/*.ts'],
    cli: {
      migrationsDir: 'src/migrations/entities',
    },
    namingStrategy: new SnakeNamingStrategy(),
  },
  {
    name: 'seed',
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PWD,
    database: process.env.TYPEORM_DB,
    migrations: ['src/migrations/seed/*.ts'],
    cli: {
      migrationsDir: 'src/migrations/seed',
    },
  },
];

export = config;
