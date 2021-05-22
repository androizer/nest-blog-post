import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventController } from './controllers';
import { BookmarkEntity, ImageEntity } from './models';
import { BookmarkService, EventService, ImageService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity, BookmarkEntity])],
  controllers: [EventController],
  providers: [EventService, ImageService, BookmarkService],
  exports: [ImageService, BookmarkService],
})
export class SharedModule {}
