import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { Post, PostEntity } from '../../models';

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(PostEntity) private readonly postRepo: Repository<Post>) {
    super(postRepo);
  }
}
