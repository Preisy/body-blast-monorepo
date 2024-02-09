import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminFood } from './types';

export const FoodService = {
  getFoods: useServiceAction((pagination?: AdminFood.Get.Dto) =>
    api.get<AdminFood.Get.Response>('/admin/food', { params: pagination }),
  ),
  getFoodById: useServiceAction((data: AdminFood.GetById.Dto) =>
    api.get<AdminFood.GetById.Response>(`/admin/food/${data.id}`),
  ),
  postFood: useServiceAction((data: AdminFood.Post.Dto) => api.post<AdminFood.Post.Response>('/admin/food', data)),
  patchFood: useServiceAction((data: AdminFood.Patch.Dto) =>
    api.patch<AdminFood.Patch.Response>(`/admin/food/${data.id}`, data.food),
  ),
  deleteFood: useServiceAction((data: AdminFood.Delete.Dto) =>
    api.delete<AdminFood.Delete.Response>(`/admin/food/${data.id}`),
  ),
};
