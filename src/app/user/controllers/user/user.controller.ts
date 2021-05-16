import { ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { JwtAuthGuard } from '../../../auth/guards';
import { User, UserEntity } from '../../models';
import { UserService } from '../../services';

@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      posts: {
        eager: false,
      },
      comments: {
        eager: false,
      },
      avatar: {
        eager: false,
      },
    },
  },
  routes: {
    exclude: ['createManyBase', 'createOneBase'],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public readonly service: UserService) {}
}
