import { AppBaseEntity } from 'shared/api';
import { Food } from 'shared/api/food';
import { AppPagination } from 'shared/api';

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
    export interface Dto {
      id: Food['id'];
      category?: Food['category'];
      name?: Food['name'];
      type?: Food['type'];
    }
    export interface Response extends AppBaseEntity.Response<Food> {}
  }

  export namespace Delete {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response {
      status: boolean;
    }
  }
}
