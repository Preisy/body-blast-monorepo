import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib';
import { Nutrition } from '..';

export const NutritionService = {
  getNutrition: useServiceAction((pagination?: Nutrition.Get.Dto) =>
    api<Nutrition.Get.Response>('/nutrition', { params: pagination }),
  ),
};
