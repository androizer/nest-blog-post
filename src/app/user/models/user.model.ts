import { Comment } from '../../comment/models';
import { Post } from '../../post/models';
import { Role } from '../../shared/enums';
import { BookMark, Image } from '../../shared/models';
import { uuid } from '../../shared/types';
import { IUser } from '../types';

export class User implements IUser {
  id: uuid;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  password: string;
  role: Role[];
  posts: Post[];
  postIds: uuid[];
  comments: Comment[];
  commentIds: uuid[];
  avatar: Image;
  bookmarks: BookMark[];
  bookmarkIds: uuid[];
  createdBy?: uuid;
  modifiedBy?: uuid;
  createdOn?: Date;
  modifiedOn?: Date;
  deletedOn?: Date;
}
