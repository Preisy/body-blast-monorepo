import { AppBaseEntity, Nutrition, AppPagination } from 'shared/api';

export namespace AdminNutrition {
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<Nutrition> {}
  }
  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<Nutrition> {}
  }
  export namespace Post {
    export interface Dto extends Pick<Nutrition, 'userId' | 'name' | 'mealItems'> {}
    export interface Response extends Omit<Nutrition, 'user'> {}
  }
  export namespace Patch {
    export interface Dto {
      id: Nutrition['id'];
      name?: Nutrition['name'];
      mealItems?: Nutrition['mealItems'];
    }
    export interface Response extends AppBaseEntity.Response<Nutrition> {}
  }
  export namespace Delete {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response {
      status: boolean;
    }
  }
}
