import { PickType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PostBaseDTO } from './post-base.dto';

export class CreatePostDTO extends PickType(PostBaseDTO, ['content', 'title']) {
  @Type(() => String)
  @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}
