import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';

export interface BonusVideo extends AppBaseEntity {
  name: string;
  linkUrl: string;
}

export namespace BonusVideo {
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<BonusVideo> {}
  }

  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<BonusVideo> {}
  }
}