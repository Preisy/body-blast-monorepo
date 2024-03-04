import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminNutrition } from './types';

export const adminNutritionService = {
  getNutritions: useServiceAction((data?: AdminNutrition.Get.Dto) =>
    api.get<AdminNutrition.Get.Response>(`/admin/nutrition`, { params: data }),
  ),
  postNutrition: useServiceAction((data: AdminNutrition.Post.Dto) =>
    api.post<AdminNutrition.Post.Response>(`/admin/nutrition`, data),
  ),
  getNutritionById: useServiceAction((data: AdminNutrition.GetById.Dto) =>
    api.get<AdminNutrition.GetById.Response>(`/admin/nutrition/${data.id}`),
  ),
  patchNutrition: useServiceAction((data: AdminNutrition.Patch.Dto) =>
    api.patch<AdminNutrition.Patch.Response>(`/admin/nutrition/${data.id}`, data),
  ),
  deleteNutrition: useServiceAction((data: AdminNutrition.Delete.Dto) =>
    api.delete<AdminNutrition.Delete.Response>(`/admin/nutrition/${data.id}`),
  ),
};
