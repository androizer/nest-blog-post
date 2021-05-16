import { PickType } from '@nestjs/swagger';

import { UserBase } from '../../../user/models';

export class LoginDTO extends PickType(UserBase, ['email', 'password']) {}
