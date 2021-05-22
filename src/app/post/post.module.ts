import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkEntity, ImageEntity } from '../shared/models';
import { BookmarkService, ImageService } from '../shared/services';
import { PostController } from './controllers';
import { PostEntity } from './models/entities';
import { PostService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ImageEntity, BookmarkEntity])],
  controllers: [PostController],
  providers: [PostService, ImageService, BookmarkService],
})
export class PostModule {}
