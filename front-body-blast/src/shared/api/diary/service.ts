import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { Diary } from './types';

export const DiaryService = {
  patch: useServiceAction((id: string, data: Diary.Patch.Dto) => api.patch<Diary.Patch.Response>(`/diary/${id}`, data)),
  get: useServiceAction((pagination?: Diary.Get.Dto) => api.get<Diary.Get.Response>('/diary', { params: pagination })),
  getById: useServiceAction((id: string) => api.get<Diary.GetById.Response>(`/diary/${id}`)),
};
