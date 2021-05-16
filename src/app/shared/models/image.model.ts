import { IImage, uuid } from '../types';

export class Image implements IImage {
  id: uuid;
  blob: Buffer;
  name: string;
  contentType: string;
  size: number;
  createdOn?: Date;
  modifiedOn?: Date;
  deletedOn?: Date;
}
