import { IsUUID } from 'class-validator';

import { uuid } from '../../../shared/types';

export class RevokeTokenDTO {
  @IsUUID()
  userId: uuid;
}
