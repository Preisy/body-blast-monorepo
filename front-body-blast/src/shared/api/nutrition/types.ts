import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';
import { User } from '../user';

export interface Nutrition extends AppBaseEntity {
  name: string;
  mealItems?: Array<Nutrition.Item>;
  user?: User;
  userId: number;
}

export namespace Nutrition {
  export interface Item extends AppBaseEntity {
    category: number;
    type: string;
    quantity?: string;
    nutritionId?: string;
  }

  export interface Dto extends AppPagination.BaseDto {}
  export interface Response extends AppPagination.Response<Nutrition> {}
}
