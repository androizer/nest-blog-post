import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreatePostDTO } from './create-post.dto';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @Transform(({ value }) => {
    if (typeof value === 'string' && value === 'true') {
      return true;
    }
    return false;
  })
  @IsBoolean()
  @IsOptional()
  deleteCoverImg: boolean;
}
