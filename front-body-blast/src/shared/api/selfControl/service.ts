import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { SelfControl } from './types';

export const SelfControlService = {
  patch: useServiceAction((id: string, data: SelfControl.Patch.Dto) =>
    api.patch<SelfControl.Patch.Response>(`/self-control/${id}`, data),
  ),
  get: useServiceAction((pagination?: SelfControl.Get.Dto) =>
    api.get<SelfControl.Get.Response>('/self-control', { params: pagination }),
  ),
  getById: useServiceAction((id: string) => api.get<SelfControl.GetById.Response>(`/self-control/${id}`)),
};
