import { AppBaseEntity } from 'shared/api/base';
import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminUser } from './types';

export const adminProfileService = {
  getUsers: useServiceAction((data?: AdminUser.Get.Dto) =>
    api.get<AdminUser.Get.Response>(`/admin/users`, { params: data }),
  ),
  getUserById: useServiceAction((data: AppBaseEntity.Dto) =>
    api.get<AdminUser.GetById.Response>(`/admin/users/${data.id}`),
  ),
  getUserDiaries: useServiceAction((data: AdminUser.GetDiaries.Dto) =>
    api.get<AdminUser.GetDiaries.Response>(`/admin/users/${data.id}/diaries`, { params: data.pagination }),
  ),
  getUserSteps: useServiceAction((data: AdminUser.GetSteps.Dto) =>
    api.get<AdminUser.GetSteps.Response>(`/admin/users/${data.id}/steps`, { params: data.pagination }),
  ),
  patchUser: useServiceAction((data: AdminUser.Patch.Dto) =>
    api.patch<AdminUser.Patch.Response>(`/admin/users/${data.id}`, data.user),
  ),
};
