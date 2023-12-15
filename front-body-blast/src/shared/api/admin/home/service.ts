import { AppPagination } from 'shared/api/base';
import { User } from 'shared/api/user';
import { api } from 'shared/config/axios';
import { useServiceAction, BasePaginationRequest } from 'shared/lib/utils';
import { AdminGetUsers, AdminPatchUser } from './types';

export const adminProfileService = {
  getUsers: useServiceAction((data?: AppPagination.BaseDto) =>
    api.get<AdminGetUsers.Response>(BasePaginationRequest(`/admin/users`, data)),
  ),
  patchUser: useServiceAction((id: number | string, data: Partial<User>) =>
    api.patch<AdminPatchUser.Response>(`/admin/users/${id}`, data),
  ),
};
