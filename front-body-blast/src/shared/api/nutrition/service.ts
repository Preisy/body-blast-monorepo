import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { Nutrition } from './types';

export const ProductsService = {
  getNutrition: useServiceAction((pagination?: Nutrition.Get.Dto) =>
    api<Nutrition.Get.Response>('/nutrition', { params: pagination }),
  ),
};
