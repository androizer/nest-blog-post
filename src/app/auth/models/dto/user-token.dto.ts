import { Expose } from 'class-transformer';

import { Role } from '../../../shared/enums';

@Expose()
export class UserToken {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  role: Role;

  @Expose()
  createdOn: Date;

  @Expose()
  modifiedOn: Date;
}
