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
} from 'typeorm';

import { Comment, CommentEntity } from '../../../comment/models';
import { Post, PostEntity } from '../../../post/models';
import { Role } from '../../../shared/enums';
import { Image, ImageEntity, Ownership, OwnerTimestampEntity } from '../../../shared/models';
import { IUser } from '../../types';

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

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: Comment[];

  @OneToOne(() => ImageEntity, (image) => image.id)
  @JoinColumn()
  avatar: Image;

  @BeforeInsert()
  createFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
    // Hash the password
    this.password = hashSync(this.password, 10);
  }
}
