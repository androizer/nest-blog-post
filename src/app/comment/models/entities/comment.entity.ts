import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Post, PostEntity } from '../../../post/models';
import { Ownership, OwnerTimestampEntity } from '../../../shared/models';
import { uuid } from '../../../shared/types';
import { User, UserEntity } from '../../../user/models';
import { IComment } from '../../types';

@Entity('comment')
export class CommentEntity extends Ownership(OwnerTimestampEntity) implements IComment {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  author: User;

  @Column({ type: 'uuid', nullable: true })
  authorId: uuid;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: Post;

  @Column({ type: 'uuid', nullable: true })
  postId: uuid;
}
