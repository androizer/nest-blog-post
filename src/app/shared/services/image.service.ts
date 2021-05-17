import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { Image, ImageEntity } from '../models';
import { uuid } from '../types';

@Injectable()
export class ImageService extends TypeOrmCrudService<Image> {
  constructor(@InjectRepository(ImageEntity) public readonly imageRepo: Repository<Image>) {
    super(imageRepo);
  }

  createAndSave(file: Express.Multer.File): Promise<Image | undefined> {
    if (file) {
      const model = this.imageRepo.create({
        blob: file.buffer,
        contentType: file.mimetype,
        name: file.originalname,
        size: file.size,
      });
      return this.imageRepo.save(model);
    }
    return undefined;
  }

  /**
   *
   * @param imageId Image ID
   * @param file Multer File
   * @param isCoverDeleted boolean based value if cover image is to be removed!
   * @returns Either Image entity or null (indicating to remove the relation & image entity)
   */
  async updateAndSave(
    imageId: uuid,
    file?: Express.Multer.File,
    isCoverDeleted = false,
  ): Promise<Image | null> {
    if (file) {
      const model = this.imageRepo.create({
        ...(imageId ? { id: imageId } : null),
        blob: file.buffer,
        contentType: file.mimetype,
        name: file.originalname,
        size: file.size,
      });
      return this.imageRepo.save(model);
    } else if (isCoverDeleted) {
      this.imageRepo.softDelete(imageId);
      return null;
    }
    return undefined;
  }
}
