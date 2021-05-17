import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { resolve } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import DatabaseConfig from './db.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(DatabaseConfig.KEY) private readonly dbConfig: ConfigType<typeof DatabaseConfig>,
  ) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      name: connectionName ?? 'default',
      type: 'postgres',
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
      autoLoadEntities: true,
      entities: [resolve(__dirname, '..', 'app', '**/*.entity{.ts,.js}')],
      migrations: [resolve(__dirname, '..', 'migrations', '*{.ts,.js}')],
      cli: {
        migrationsDir: resolve(__dirname, '..', 'migrations', 'entities'),
      },
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
