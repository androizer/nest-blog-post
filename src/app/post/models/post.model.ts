import { Comment } from '../../comment/models';
import { BookMark, Image } from '../../shared/models';
import { uuid } from '../../shared/types';
import { User } from '../../user/models';
import { IPost } from '../types';

export class Post implements IPost {
  id: uuid;
  title: string;
  content: string;
  votes: uuid[];
  author: User;
  authorId: uuid;
  comments: Comment[];
  commentIds: uuid[];
  image: Image;
  bookmarkedBy: BookMark[];
  bookmarkedIds: uuid[];
  tags: string[];
  createdBy?: string;
  modifiedBy?: string;
  createdOn?: Date;
  modifiedOn?: Date;
  deletedOn?: Date;
}
