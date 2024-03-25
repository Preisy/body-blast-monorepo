import { UseGuards } from '@nestjs/common';
import { UserRole } from '../constants/constants';
import { RoleGuard } from '../modules/authentication/guards/role.guard';

export const AppRoles = (...roles: UserRole[]) => {
  return UseGuards(RoleGuard(roles));
};
