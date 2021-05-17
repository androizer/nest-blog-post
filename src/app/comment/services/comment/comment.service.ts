import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Comment, CommentEntity } from '../../models';

@Injectable()
export class CommentService extends TypeOrmCrudService<Comment> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<Comment>,
  ) {
    super(commentRepo);
  }
}
