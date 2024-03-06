import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { Food } from './types';

export const FoodService = {
  getFood: useServiceAction((pagination?: Food.Get.Dto) => api.get<Food.Get.Response>('/food', { params: pagination })),
};
