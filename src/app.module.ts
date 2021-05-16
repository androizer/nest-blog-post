import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { CommentModule } from './app/comment/comment.module';
import { PostModule } from './app/post/post.module';
import { SharedModule } from './app/shared/shared.module';
import { UserModule } from './app/user/user.module';
import AuthConfig from './config/auth.config';
import DatabaseConfig from './config/db.config';
import { envValidator as validate } from './config/env.validator';
import { TypeOrmConfigService } from './config/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
      load: [DatabaseConfig, AuthConfig],
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      name: 'default',
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    PostModule,
    CommentModule,
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
