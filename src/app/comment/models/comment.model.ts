import { Post } from '../../post/models/post.model';
import { uuid } from '../../shared/types';
import { User } from '../../user/models';
import { IComment } from '../types/comment.interface';

export class Comment implements IComment {
  id: uuid;
  content: string;
  author: User;
  post: Post;
  createdBy?: string;
  modifiedBy?: string;
  createdOn?: Date;
  modifiedOn?: Date;
  deletedOn?: Date;
}
