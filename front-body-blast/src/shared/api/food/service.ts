import { api } from 'shared/config/axios';
import { basePaginationRequest, useServiceAction } from 'shared/lib/utils';
import { Food } from './types';

export namespace FoodService {
  export const getFood = useServiceAction(() => api<Food.Response>(basePaginationRequest('/food')));
}
