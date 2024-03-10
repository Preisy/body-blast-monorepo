import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AppPagination } from '../pagination';
import { Anthropometry } from './types';

export const anthropometryService = {
  getAnthropometry: useServiceAction((params: Partial<AppPagination.DateDto>) =>
    api.get<Anthropometry.Get.Response>(`/anthropometrics`, { params }),
  ),
  patchAnthropometry: useServiceAction((data: Anthropometry.Patch.Dto) =>
    api.patch<Anthropometry.Patch.Response>(`/anthropometrics/${data.id}`, data),
  ),
};
