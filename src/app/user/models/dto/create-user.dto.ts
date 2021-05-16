import { PickType } from '@nestjs/swagger';

import { UserBase } from './user-base.dto';

export class CreateUserDTO extends PickType(UserBase, ['firstName', 'lastName', 'email']) {}
