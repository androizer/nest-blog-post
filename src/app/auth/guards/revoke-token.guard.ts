import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../../shared/enums';
import { User } from '../../user/models';
import { RevokeTokenDTO } from '../models/dto';

export class RevokeTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const body: RevokeTokenDTO = request.body;
    if (user) {
      if (user.role.includes(Role.Admin) || user.id === body?.userId) {
        return true;
      }
    }
    return false;
  }
}
