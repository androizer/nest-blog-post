import { Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Post, PostEntity } from '../../../post/models';
import { User, UserEntity } from '../../../user/models';
import { IBookmark, uuid } from '../../types';
import { BookMark } from '../bookmark.model';
import { OwnerTimestampEntity } from './owner-timestamp.entity';

@Entity('bookmarks')
export class BookmarkEntity extends OwnerTimestampEntity implements IBookmark {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @ManyToOne(() => PostEntity, (post) => post.bookmarkedBy, { nullable: false })
  post: Post;

  @RelationId((bookmark: BookMark) => bookmark.post)
  postId: uuid;

  @ManyToOne(() => UserEntity, (user) => user.bookmarks, { nullable: false })
  user: User;

  @RelationId((bookmark: BookMark) => bookmark.user)
  userId: uuid;
}
