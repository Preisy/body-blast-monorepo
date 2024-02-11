import { AppPagination } from 'shared/api/pagination';
import { Training } from 'shared/api/training';
import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AdminTraining } from './types';

export const AdminTrainingsService = {
  postTrainings: useServiceAction((data: AdminTraining.Dto) =>
    api.post<AdminTraining.Response>('/admin/workouts', data),
  ),
  getTrainings: useServiceAction((data: AppPagination.BaseDto) =>
    api.get<Training.Response.Expanded>(`/admin/workouts`, { params: data }),
  ),
  getUserTrainings: useServiceAction((id: number) => api.get<Training.Response.Expanded>(`/admin/workouts/${id}`)),
  patchUserTrainings: useServiceAction((id: number, data: AdminTraining.Dto) =>
    api.patch<AdminTraining.Response>(`/admin/workouts/${id}`, data),
  ),
  deleteUserTrainings: useServiceAction((id: number) =>
    api.delete<AdminTraining.Delete.Response>(`/admin/workouts/${id}`),
  ),
};
