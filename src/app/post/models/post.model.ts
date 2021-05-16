import { Comment } from '../../comment/models';
import { Image } from '../../shared/models';
import { uuid } from '../../shared/types';
import { User } from '../../user/models';
import { IPost } from '../types';

export class Post implements IPost {
  id: uuid;
  title: string;
  content: string;
  votes: number;
  author: User;
  comments: Comment[];
  image: Image;
  tags: string[];
  createdBy?: string;
  modifiedBy?: string;
  createdOn?: Date;
  modifiedOn?: Date;
  deletedOn?: Date;
}
