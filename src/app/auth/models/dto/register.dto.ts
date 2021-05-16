import { PickType } from '@nestjs/swagger';
import { UserBase } from '../../../user/models/dto';

export class RegisterDTO extends PickType(UserBase, [
  'email',
  'password',
  'firstName',
  'lastName',
]) {}
