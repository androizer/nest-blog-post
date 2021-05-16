import { PickType } from '@nestjs/swagger';
import { CommentBaseDTO } from './comment-base.dto';

export class CreateCommentDTO extends PickType(CommentBaseDTO, ['content', 'postId']) {}
