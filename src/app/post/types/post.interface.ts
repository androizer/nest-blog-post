import { IComment } from '../../comment/types';
import { IImage, IOwnership, IOwnerTimestamp, uuid } from '../../shared/types';
import { IUser } from '../../user/types';

export interface IPost extends IOwnership, IOwnerTimestamp {
  id: string;
  title: string;
  content: string;
  votes: uuid[];
  author: IUser;
  comments: IComment[];
  image?: IImage;
  tags: string[];
}
