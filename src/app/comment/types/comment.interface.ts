import { IPost } from '../../post/types';
import { IOwnership, IOwnerTimestamp, uuid } from '../../shared/types';
import { IUser } from '../../user/types';

export interface IComment extends IOwnership, IOwnerTimestamp {
  id: uuid;
  content: string;
  author: IUser;
  authorId: uuid;
  post: IPost;
  postId: uuid;
}
