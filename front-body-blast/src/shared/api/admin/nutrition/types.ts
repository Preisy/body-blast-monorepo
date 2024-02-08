import { AppBaseEntity } from 'shared/api/base';
import { Nutrition } from 'shared/api/nutrition';
import { AppPagination } from 'shared/api/pagination';

export namespace AdminNutrition {
  export namespace Post {
    export interface Dto extends Pick<Nutrition, 'userId' | 'name' | 'mealItems'> {}
    export interface Response extends Omit<Nutrition, 'user'> {}
  }
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<Nutrition> {}
  }
  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<Nutrition> {}
  }
  export namespace Patch {
    export interface Dto extends AppBaseEntity.Dto {
      nutrition: Pick<Nutrition, 'name' | 'mealItems'>;
    }
    export interface Response extends AppBaseEntity.Response<Nutrition> {}
  }
  export namespace Delete {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<{ status: boolean }> {}
  }
}
