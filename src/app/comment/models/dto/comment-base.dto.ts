import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { uuid } from '../../../shared/types';

export class CommentBaseDTO {
  @IsUUID()
  id: uuid;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  authorId: uuid;

  @IsUUID()
  postId: uuid;
}
