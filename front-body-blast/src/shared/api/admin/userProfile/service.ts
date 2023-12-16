import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { User } from 'shared/api/user';
import { api } from 'shared/config/axios';
import { useServiceAction, basePaginationRequest, baseRequest } from 'shared/lib/utils';
import { AdminGetUsers, AdminGetUser, AdminPatchUser } from './types';

export const adminProfileService = {
  getUsers: useServiceAction((data?: AppPagination.BaseDto) =>
    api.get<AdminGetUsers.Response>(basePaginationRequest(`/admin/users`, data)),
  ),
  getUser: useServiceAction((data: AppBaseEntity.Dto) =>
    api.get<AdminGetUser.Response>(baseRequest(`/admin/users`, data)),
  ),
  patchUser: useServiceAction((id: number | string, data: Partial<User>) =>
    api.patch<AdminPatchUser.Response>(`/admin/users/${id}`, data),
  ),
};
