import { api } from 'shared/config/axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Food } from './types';

export const foodApi: Food.Response = {
  count: 1,
  data: [
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Овсянка', category: 1, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Булгур', category: 1, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Гречка', category: 2, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Рис', category: 2, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Полба', category: 3, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Перловка', category: 3, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Пшенка', category: 3, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Киноа', category: 3, type: 'cereals' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Огурец', category: 1, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Булгур', category: 1, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Гречка', category: 2, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Рис', category: 2, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Полба', category: 3, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Перловка', category: 3, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Пшенка', category: 3, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Киноа', category: 3, type: 'vegetables' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Яблоко', category: 1, type: 'fruitsAndBerries' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Булгур', category: 1, type: 'fruitsAndBerries' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Полба', category: 3, type: 'fruitsAndBerries' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Перловка', category: 3, type: 'fruitsAndBerries' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Пшенка', category: 3, type: 'fruitsAndBerries' },
    { createdAt: '', deletedAt: '', updatedAt: '', id: 1, name: 'Киноа', category: 3, type: 'fruitsAndBerries' },
  ],
};

export namespace FoodService {
  export const mockGetFood = useServiceAction(() => requestSimulator<Food.Response>(foodApi));
  export const getFood = useServiceAction(() => api<Food.Response>(''));
}
