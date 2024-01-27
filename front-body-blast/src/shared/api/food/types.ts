import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';

export interface Food extends AppBaseEntity {
  type: string;
  category: number;
  name: string;
}

export namespace Food {
  export interface Dto extends AppPagination.BaseDto {}
  export interface Response extends AppPagination.Response<Food> {}
}
