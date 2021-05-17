import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { User } from '../../user/models';

export const CurrentUser = createParamDecorator(
  (data: (keyof User)[] = [], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user = request.user;
    if (data.length) {
      const partialUser = data.reduce((acc, key) => {
        acc[key] = user[key];
        return acc;
      }, {});
      user = partialUser;
    }
    return plainToClass(User, user);
  },
);
