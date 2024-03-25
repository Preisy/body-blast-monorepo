import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AdminAnthropometry } from './types';

export const anthropometryService = {
  getAnthropometry: useServiceAction((data: AdminAnthropometry.Get.Dto) =>
    api.get<AdminAnthropometry.Get.Response>(`admin/anthropometrics`, { params: data }),
  ),
  getAnthropometryById: useServiceAction((data: AdminAnthropometry.GetById.Dto) =>
    api.get<AdminAnthropometry.GetById.Response>(`admin/anthropometrics/${data.id}`),
  ),
};
