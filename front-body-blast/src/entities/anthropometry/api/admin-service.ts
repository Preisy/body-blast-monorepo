import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib';
import { AdminAnthropometry } from '..';

export const anthropometryAdminService = {
  getAnthropometry: useServiceAction((data: AdminAnthropometry.Get.Dto) =>
    api.get<AdminAnthropometry.Get.Response>(`admin/anthropometrics`, { params: data }),
  ),
  getAnthropometryById: useServiceAction((data: AdminAnthropometry.GetById.Dto) =>
    api.get<AdminAnthropometry.GetById.Response>(`admin/anthropometrics/${data.id}`),
  ),
};
