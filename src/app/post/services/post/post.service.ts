import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { BookMark, BookmarkEntity } from '../../../shared/models';

import { uuid } from '../../../shared/types';
import { User } from '../../../user/models';
import { Post, PostEntity } from '../../models';

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepo: Repository<Post>,
    @InjectRepository(BookmarkEntity) private readonly bookmarkRepo: Repository<BookMark>,
  ) {
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

  /**
   * If the current user has already bookmarked, then remove it else
   * bookmark it for the current user.
   * @param postId Post ID
   * @param user User
   * @returns ID which is added/removed and isRemoved boolean value
   */
  async toggleBookmark(postId: uuid, user: User): Promise<{ id: uuid; isRemoved: boolean }> {
    const post = plainToClass(Post, { id: postId });
    let bookmark = await this.bookmarkRepo.findOne({ where: { post, user } });
    if (bookmark) {
      this.bookmarkRepo.softDelete(bookmark.id);
      return { id: bookmark.id, isRemoved: true };
    } else {
      bookmark = await this.bookmarkRepo.save({ post, user });
      return { id: bookmark.id, isRemoved: false };
    }
  }
}
