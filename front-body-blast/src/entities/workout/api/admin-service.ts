import { AppBaseEntity } from 'shared/api';
import { AppPagination } from 'shared/api';
import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AdminWorkout } from '..';

export const AdminWorkoutService = {
  postWorkout: useServiceAction((data: AdminWorkout.Post.Dto) =>
    api.post<AdminWorkout.Post.Response>('/admin/workouts', data),
  ),
  getWorkout: useServiceAction((pagination: AppPagination.DateDto) =>
    api.get<AdminWorkout.Get.Response>(`/admin/workouts/date`, { params: pagination }),
  ),
  getWorkoutById: useServiceAction((id: AppBaseEntity['id']) =>
    api.get<AdminWorkout.GetById.Response>(`/admin/workouts/${id}`),
  ),
  patchWorkout: useServiceAction((id: AppBaseEntity['id'], data: AdminWorkout.Patch.Dto) =>
    api.patch<AdminWorkout.Patch.Response>(`/admin/workouts/${id}`, data),
  ),
  deleteWorkout: useServiceAction((id: AppBaseEntity['id']) =>
    api.delete<AdminWorkout.Delete.Response>(`/admin/workouts/${id}`),
  ),
};
