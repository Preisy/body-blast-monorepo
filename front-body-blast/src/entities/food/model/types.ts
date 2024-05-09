import { z } from 'zod';
import { AppBaseEntity, AppPagination } from 'shared/api';

export interface Food extends AppBaseEntity {
  type: string;
  category: number;
  name: string;
}

export namespace Food {
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<Food> {}
  }

  export const validation = () =>
    z.object({
      type: z.string(),
      category: z.coerce.number(),
      name: z.string(),
    });
}
