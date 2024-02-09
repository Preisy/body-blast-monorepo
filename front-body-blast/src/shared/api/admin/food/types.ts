import { AppBaseEntity } from 'shared/api/base';
import { Food } from 'shared/api/food';
import { AppPagination } from 'shared/api/pagination';

export namespace AdminFood {
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<Food> {}
  }

  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<Food> {}
  }

  export namespace Post {
    export interface Dto extends Pick<Food, 'name' | 'type' | 'category'> {}
    export interface Response extends AppBaseEntity.Response<Food> {}
  }

  export namespace Patch {
    export interface Dto extends AppBaseEntity.Dto {
      food: Pick<Food, 'name' | 'type' | 'category'>;
    }
    export interface Response extends AppBaseEntity.Response<Food> {}
  }

  export namespace Delete {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<{ status: boolean }> {}
  }
}
