import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageEntity } from '../shared/models';
import { ImageService } from '../shared/services';
import { PostController } from './controllers';
import { PostEntity } from './models/entities';
import { PostService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ImageEntity])],
  controllers: [PostController],
  providers: [PostService, ImageService],
})
export class PostModule {}
