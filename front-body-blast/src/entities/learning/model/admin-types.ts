import { AppBaseEntity } from 'shared/api';
import { AppPagination } from 'shared/api';
import { BonusVideo } from '..';

export namespace AdminBonusVideo {
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<BonusVideo> {}
  }

  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<BonusVideo> {}
  }

  export namespace Post {
    export interface Dto extends Pick<BonusVideo, 'name' | 'linkUrl'> {}
    export interface Response extends AppBaseEntity.Response<BonusVideo> {}
  }

  export namespace Delete {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response {
      status: boolean;
    }
  }
}
