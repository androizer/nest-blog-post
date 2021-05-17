import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { uuid } from '../../../shared/types';

export class PostBaseDTO {
  @IsUUID()
  @IsOptional()
  id: uuid;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  votes: number;

  @Type(() => String)
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}
