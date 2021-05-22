import { IPost } from '../../post/types';
import { IUser } from '../../user/types';
import { uuid } from './core.type';
import { IOwnerTimestamp } from './owner-timestamp.type';

export interface IBookmark extends IOwnerTimestamp {
  id: uuid;
  user: IUser;
  userId: uuid;
  post: IPost;
  postId: uuid;
}
