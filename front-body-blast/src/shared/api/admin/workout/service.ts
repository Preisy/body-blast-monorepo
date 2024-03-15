import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { Workout as AdminTraining } from './types';

export const AdminWorkoutService = {
  postWorkout: useServiceAction((data: AdminTraining.Post.Dto) =>
    api.post<AdminTraining.Post.Response>('/admin/workouts', data),
  ),
  getWorkout: useServiceAction((pagination: AppPagination.BaseDto) =>
    api.get<AdminTraining.Get.Response>(`/admin/workouts`, { params: pagination }),
  ),
  getWorkoutById: useServiceAction((id: AppBaseEntity['id']) =>
    api.get<AdminTraining.GetById.Response>(`/admin/workouts/${id}`),
  ),
  patchWorkout: useServiceAction((id: AppBaseEntity['id'], data: AdminTraining.Patch.Dto) =>
    api.patch<AdminTraining.Patch.Response>(`/admin/workouts/${id}`, data),
  ),
  deleteWorkout: useServiceAction((id: AppBaseEntity['id']) =>
    api.delete<AdminTraining.Delete.Response>(`/admin/workouts/${id}`),
  ),
};
