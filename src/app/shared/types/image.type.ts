import { uuid } from './core.type';
import { IOwnerTimestamp } from './owner-timestamp.type';

export interface IImage extends IOwnerTimestamp {
  id: uuid;
  blob: Buffer;
  name: string;
  contentType: string;
  size: number;
}
