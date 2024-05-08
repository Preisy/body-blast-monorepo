import { AppBaseEntity } from 'shared/api';
import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib';
import { Diary } from '..';

export const DiaryService = {
  patch: useServiceAction((id: AppBaseEntity.Dto['id'], data: Diary.Patch.Dto) =>
    api.patch<Diary.Patch.Response>(`/diary/${id}`, data),
  ),
  get: useServiceAction((pagination?: Diary.Get.Dto) => api.get<Diary.Get.Response>('/diary', { params: pagination })),
  getById: useServiceAction((id: string) => api.get<Diary.GetById.Response>(`/diary/${id}`)),
};
