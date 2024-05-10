import { Diary } from 'entities/diary';
import { AppBaseEntity, AppPagination } from 'shared/api';

export namespace AdminDiary {
  export namespace Get {
    export interface Dto extends AppPagination.DateDto {}
    export interface Response extends AppPagination.Response<Diary> {}
  }
  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<Diary> {}
  }
  export namespace Post {
    export interface Dto extends Diary {}
    export interface Response extends AppBaseEntity.Response<Diary> {}
  }
  export namespace Delete {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response {
      status: boolean;
    }
  }
  export namespace Patch {
    export interface Dto {
      id: AppBaseEntity['id'];
      data: Partial<Diary>;
    }
    export interface Response extends AppBaseEntity.Response<Diary> {}
  }
  export namespace GetUserDiaries {
    export interface Dto {
      id: AppBaseEntity.Dto['id'];
      pagination?: AppPagination.DateDto;
    }
    export interface Response extends AppPagination.Response<Diary> {}
  }
}
