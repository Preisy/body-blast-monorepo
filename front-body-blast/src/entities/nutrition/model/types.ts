import { z } from 'zod';
import { AppBaseEntity, AppPagination, User } from 'shared/api';

export interface Nutrition extends AppBaseEntity {
  name: string;
  mealItems?: Array<Nutrition.Item>;
  user?: User;
  userId: AppBaseEntity['id'];
}

export namespace Nutrition {
  export interface Item extends AppBaseEntity {
    category: number;
    type: string;
    quantity?: string;
    nutritionId?: string;
  }
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<Nutrition> {}
  }
  export const validation = () =>
    z.object({
      name: z.string(),
      userId: z.coerce.number(),
      mealItems: z
        .array(
          z
            .object({
              category: z.coerce.number(),
              type: z.string(),
              quantity: z.string(),
              nutritionId: z.string(),
            })
            .partial(),
        )
        .min(1),
    });
}
