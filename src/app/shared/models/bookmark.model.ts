import { Post } from '../../post/models';
import { User } from '../../user/models';
import { IBookmark, uuid } from '../types';

export class BookMark implements IBookmark {
  id: uuid;
  post: Post;
  postId: uuid;
  user: User;
  userId: uuid;
  createdOn: Date;
  modifiedOn: Date;
  deletedOn: Date;
}
