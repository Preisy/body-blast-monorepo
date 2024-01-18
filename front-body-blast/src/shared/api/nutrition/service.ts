import { api } from 'shared/config/axios';
import { basePaginationRequest, useServiceAction } from 'shared/lib/utils';
import { Nutrition } from './types';

export namespace ProductsService {
  export const getNutrition = useServiceAction(() => api<Nutrition.Response>(basePaginationRequest('/nutrition')));
}
