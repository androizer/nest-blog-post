import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventController } from './controllers';
import { ImageEntity } from './models';
import { EventService, ImageService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  controllers: [EventController],
  providers: [ImageService, EventService],
  exports: [ImageService],
})
export class SharedModule {}
