import { api } from 'shared/config/axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Nutrition } from './types';
export const nutritionApi: Nutrition.Response = {
  count: 1,
  data: [
    {
      id: 1,
      userId: 1,
      user: undefined,
      name: 'breakfast',
      mealItems: [
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '100гр', type: 'Рис', category: 2 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '101гр', type: 'Полба', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '102гр', type: 'Перловка', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '103гр', type: 'Пшенка', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '104гр', type: 'Киноа', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '105гр', type: 'Огурец', category: 1 },
      ],
    },
    {
      id: 1,
      userId: 1,
      user: undefined,
      name: 'lunch',
      mealItems: [
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '200гр', type: 'Рис', category: 2 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '301гр', type: 'Полба', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '302гр', type: 'Перловка', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '303гр', type: 'Пшенка', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '304гр', type: 'Киноа', category: 3 },
        { createdAt: '', deletedAt: '', updatedAt: '', id: 1, quantity: '305гр', type: 'Огурец', category: 1 },
      ],
    },
  ],
};

export namespace ProductsService {
  export const getMockNutrition = useServiceAction(() => requestSimulator<Nutrition.Response>(nutritionApi));
  export const getNutrition = useServiceAction(() => api<Nutrition.Response>(''));
}
