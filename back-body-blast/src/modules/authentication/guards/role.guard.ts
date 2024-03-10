import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JWTAuthGuard } from './jwtAuth.guard';
import { UserRole } from '../../../constants/constants';
import { RequestWithUser } from '../types/requestWithUser.type';

export const RoleGuard = (roles: UserRole | UserRole[]): Type<CanActivate> => {
  class RoleGuardMixin extends JWTAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      const availableRoles = Array.isArray(roles) ? roles : [roles];

      return user?.role == UserRole.Admin ? true : availableRoles.some((r) => user?.role.includes(r));
    }
  }

  return mixin(RoleGuardMixin);
};
