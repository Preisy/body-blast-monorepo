import { AppBaseEntity } from 'shared/api';
import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminUser } from '.';

export const adminUserService = {
  getUsers: useServiceAction((data?: AdminUser.Get.Dto) =>
    api.get<AdminUser.Get.Response>(`/admin/users`, { params: data }),
  ),
  getUserById: useServiceAction((data: AppBaseEntity.Dto) =>
    api.get<AdminUser.GetById.Response>(`/admin/users/${data.id}`),
  ),
  getUserSteps: useServiceAction((data: AdminUser.GetSteps.Dto) =>
    api.get<AdminUser.GetSteps.Response>(`/admin/users/${data.id}/steps`, { params: data.pagination }),
  ),
  patchUser: useServiceAction((data: AdminUser.Patch.Dto) =>
    api.patch<AdminUser.Patch.Response>(`/admin/users/${data.id}`, data.user),
  ),
  deleteUser: useServiceAction((data: AdminUser.Delete.Dto) =>
    api.delete<AdminUser.Delete.Response>(`/admin/users/${data.id}`),
  ),
};
