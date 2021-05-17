import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { User } from '../../models';
import { UserEntity } from '../../models/entities';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }
}
