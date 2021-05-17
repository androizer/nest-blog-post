import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: TypeOrmModuleOptions[] = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nestjs-rest',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/entities/*.ts'],
    cli: {
      migrationsDir: 'src/migrations/entities',
    },
    namingStrategy: new SnakeNamingStrategy(),
  },
];

export default config;
