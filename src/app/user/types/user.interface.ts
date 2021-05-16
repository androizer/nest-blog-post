import { IComment } from '../../comment/types';
import { IPost } from '../../post/types';
import { Role } from '../../shared/enums';
import { IImage, IOwnership, IOwnerTimestamp, uuid } from '../../shared/types';

export interface IUser extends IOwnership, IOwnerTimestamp {
  id: uuid;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  password?: string;
  role: Role[];
  posts: IPost[];
  comments: IComment[];
  avatar: IImage;
}
