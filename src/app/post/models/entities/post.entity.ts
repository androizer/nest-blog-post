import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comment, CommentEntity } from '../../../comment/models';
import { Image, ImageEntity, Ownership, OwnerTimestampEntity } from '../../../shared/models';
import { User, UserEntity } from '../../../user/models';
import { IPost } from '../../types';

@Entity({ name: 'post' })
export class PostEntity extends Ownership(OwnerTimestampEntity) implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: Comment[];

  @OneToOne(() => ImageEntity, (image) => image.id)
  @JoinColumn()
  image: Image;
}
