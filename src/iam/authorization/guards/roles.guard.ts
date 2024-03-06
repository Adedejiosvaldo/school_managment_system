import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enum/Role';
import { ROLES_KEY } from '../decorators/Role.decorators';
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';
import { REQUEST_USER_KEY } from 'src/iam/constants/user.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!contextRole) {
      return true;
    }
    const user: ActiveUserDTO = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    const isRoleValid = contextRole.some((role) => user.role === role);
    if (isRoleValid) {
      return true;
    } else {
      throw new UnauthorizedException(
        'You do not have ther permission to carry out this action',
      );
    }
  }
}
