import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Comment, CommentEntity } from '../../../comment/models';
import { Post, PostEntity } from '../../../post/models';
import { Role } from '../../../shared/enums';
import {
  BookMark,
  BookmarkEntity,
  Image,
  ImageEntity,
  Ownership,
  OwnerTimestampEntity,
} from '../../../shared/models';
import { uuid } from '../../../shared/types';
import { IUser } from '../../types';
import { User } from '../user.model';

@Entity({ name: 'user' })
export class UserEntity extends Ownership(OwnerTimestampEntity) implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  fullName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    array: true,
    type: 'text',
    default: [Role.User],
  })
  role: Role[];

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: Post[];

  @RelationId((user: User) => user.posts)
  postIds: uuid[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: Comment[];

  @RelationId((user: User) => user.comments)
  commentIds: uuid[];

  @OneToOne(() => ImageEntity, (image) => image.id)
  @JoinColumn()
  avatar: Image;

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.user)
  bookmarks: BookMark[];

  @RelationId((user: User) => user.bookmarks)
  bookmarkIds: uuid[];

  @BeforeInsert()
  createFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
    // Hash the password
    this.password = hashSync(this.password, 10);
  }
}
