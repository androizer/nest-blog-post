import { Body, Controller, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { EventEmitter2 } from 'eventemitter2';
import { Request } from 'express';

import { JwtAuthGuard } from '../../../auth/guards';
import { Post } from '../../../post/models';
import { CurrentUser } from '../../../shared/decorators';
import { User } from '../../../user/models';
import { Comment, CommentCreatedEvent, CommentEntity } from '../../models';
import { CreateCommentDTO } from '../../models/dto';
import { CommentService } from '../../services';

@Crud({
  model: {
    type: CommentEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      author: {
        eager: false,
      },
      post: {
        eager: false,
      },
      'author.avatar': {
        eager: false,
      },
    },
  },
})
@CrudAuth({
  persist: (req: Request) => {
    const method = req.method.toLocaleLowerCase();
    const comment: Partial<Comment> = {
      modifiedBy: req.user['id'],
    };
    if (['post'].includes(method)) {
      comment.author = req.user as User;
      comment.createdBy = req.user['id'];
    }
    return comment;
  },
})
@UseGuards(JwtAuthGuard)
@ApiTags('comments')
@Controller('comments')
export class CommentController implements CrudController<Comment> {
  constructor(readonly service: CommentService, private readonly emitter2: EventEmitter2) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @Body(new ValidationPipe({ whitelist: true })) dto: CreateCommentDTO,
    @CurrentUser() user: User,
  ) {
    const comment = new Comment();
    comment.content = dto.content;
    comment.post = plainToClass(Post, { id: dto.postId });
    comment.createdBy = user.id;
    const newComment = await this.service.createOne(req, comment);
    this.emitter2.emit('comment.created', new CommentCreatedEvent({ id: newComment.id }));
    return newComment;
  }
}
