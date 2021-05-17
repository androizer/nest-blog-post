import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { uuid } from '../../../shared/types';
import { User } from '../../../user/models';
import { Post, PostEntity } from '../../models';

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(PostEntity) private readonly postRepo: Repository<Post>) {
    super(postRepo);
  }

  /**
   * If the current user has already voted, then remove his vote
   * else add his vote.
   * @param postId Post ID
   * @param user User
   * @returns `true` for adding vote, `false` for removing vote.
   */
  async toggleVote(postId: uuid, user: User): Promise<boolean> {
    const post = await this.postRepo.findOne(postId, { select: ['votes'] });
    const index = post.votes.findIndex((userId) => userId === user.id);
    const found = index > -1;
    if (found) {
      post.votes.splice(index, 1);
    } else {
      post.votes.push(user.id);
    }
    this.postRepo.update(postId, post);
    return !found;
  }
}
