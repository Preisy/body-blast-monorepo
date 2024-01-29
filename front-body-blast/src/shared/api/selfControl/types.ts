import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';
import { User } from '../user';

export interface SelfControl extends AppBaseEntity {
  behaviour: string;
  date: string;
  sum: Nullable<number>;
  activivty: Nullable<string>;
  steps: Nullable<number>;
  userId: number;
  props: Array<
    AppBaseEntity & {
      label: string;
      value: number;
      selfControlId: number;
    }
  >;
}

export namespace SelfControl {
  export namespace Get {
    export interface Dto extends AppPagination.DateDto {}
    export interface Response extends AppPagination.Response<SelfControl> {}
  }

  export namespace GetById {
    interface SelfControlWithUser extends SelfControl {
      user: User;
    }
    export interface Response extends AppBaseEntity.Response<SelfControlWithUser> {}
  }

  export namespace Patch {
    export interface Dto extends Pick<SelfControl, 'activivty' | 'steps' | 'props'> {}
    export interface Response {}
  }
}
