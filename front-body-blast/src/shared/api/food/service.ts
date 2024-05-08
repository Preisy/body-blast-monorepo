import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib';
import { Food } from '.';

export const FoodService = {
  getFood: useServiceAction((pagination?: Food.Get.Dto) => api.get<Food.Get.Response>('/food', { params: pagination })),
};
