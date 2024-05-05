import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';
import { Anthropometry } from '..';

export namespace AdminAnthropometry {
  export namespace Get {
    export interface Dto extends Partial<AppPagination.DateDto> {
      userId: AppBaseEntity['id'];
    }
    export interface Response extends AppPagination.Response<Anthropometry> {}
  }

  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<Anthropometry> {}
  }
}
