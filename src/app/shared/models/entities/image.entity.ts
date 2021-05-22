import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IImage, uuid } from '../../types';
import { OwnerTimestampEntity } from './owner-timestamp.entity';

/**
 * @description Before saving the image entity, remember to call
 * the create method on image repo to run the listener hooks.
 */
@Entity('image')
export class ImageEntity extends OwnerTimestampEntity implements IImage {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({ type: 'bytea' })
  blob: Buffer;

  @Column()
  name: string;

  @Column()
  contentType: string;

  @Column({ type: 'int' })
  size: number;

  base64: string;

  @AfterLoad()
  convertArrayBufferToBase64() {
    this.base64 = this.blob ? Buffer.from(this.blob).toString('base64') : '';
    this.blob = undefined;
  }
}
