import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib';
import { AdminDiary } from '..';

export const adminDiaryService = {
  getDiary: useServiceAction((pagination?: AdminDiary.Get.Dto) =>
    api.get<AdminDiary.Get.Response>('/admin/diary', { params: pagination }),
  ),
  getDiaryById: useServiceAction((data: AdminDiary.GetById.Dto) =>
    api.get<AdminDiary.GetById.Response>(`/admin/diary/${data.id}`),
  ),
  postDiary: useServiceAction((data: AdminDiary.Post.Dto) => api.post<AdminDiary.Post.Response>('/admin/diary', data)),
  patchDiary: useServiceAction((data: AdminDiary.Patch.Dto) =>
    api.patch<AdminDiary.Patch.Response>(`/admin/diary/${data.id}`, data.data),
  ),
  deleteDiary: useServiceAction((data: AdminDiary.Delete.Dto) =>
    api.delete<AdminDiary.Delete.Response>(`/admin/diary/${data.id}`),
  ),
  getUserDiaries: useServiceAction((data: AdminDiary.GetUserDiaries.Dto) =>
    api.get<AdminDiary.GetUserDiaries.Response>(`/admin/users/${data.id}/diaries`, { params: data.pagination }),
  ),
};
