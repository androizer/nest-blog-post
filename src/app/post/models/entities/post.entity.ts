import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Comment, CommentEntity } from '../../../comment/models';
import {
  BookMark,
  BookmarkEntity,
  Image,
  ImageEntity,
  Ownership,
  OwnerTimestampEntity,
} from '../../../shared/models';
import { uuid } from '../../../shared/types';
import { User, UserEntity } from '../../../user/models';
import { IPost } from '../../types';
import { Post } from '../post.model';

@Entity({ name: 'post' })
export class PostEntity extends Ownership(OwnerTimestampEntity) implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'uuid',
    array: true,
    default: [],
  })
  votes: string[];

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @ManyToOne(() => UserEntity, (user) => user.posts, { nullable: false })
  author: User;

  @Column({ type: 'uuid', nullable: false })
  authorId: uuid;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: Comment[];

  @RelationId((post: Post) => post.comments)
  commentIds: uuid[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.post)
  bookmarkedBy: BookMark[];

  @RelationId((post: Post) => post.bookmarkedBy)
  bookmarkedIds: uuid[];

  @OneToOne(() => ImageEntity, (image) => image.id)
  @JoinColumn()
  image: Image;
}
