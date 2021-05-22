import { IComment } from '../../comment/types';
import { IBookmark, IImage, IOwnership, IOwnerTimestamp, uuid } from '../../shared/types';
import { IUser } from '../../user/types';

export interface IPost extends IOwnership, IOwnerTimestamp {
  id: string;
  title: string;
  content: string;
  votes: uuid[];
  author: IUser;
  authorId: uuid;
  comments: IComment[];
  commentIds: uuid[];
  image?: IImage;
  tags: string[];
  bookmarkedBy: IBookmark[];
  bookmarkedIds: uuid[];
}
