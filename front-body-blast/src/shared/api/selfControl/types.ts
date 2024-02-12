import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';
import { User } from '../user';

export interface SelfControl extends AppBaseEntity {
  behaviour: string;
  date: string;
  sum: Nullable<number>;
  activivty: Nullable<string>;
  steps: Nullable<number>;
  user?: User;
  userId: number;
  props?: Array<SelfControl.Prop>;
}

export namespace SelfControl {
  export interface Prop extends AppBaseEntity {
    label: string;
    value: number;
    selfControl: string;
    selfControlId: number;
  }

  export namespace Get {
    export interface Dto extends AppPagination.DateDto {}
    export interface Response extends AppPagination.Response<SelfControl> {}
  }

  export namespace GetById {
    export interface Response extends AppBaseEntity.Response<SelfControl> {}
  }

  export namespace Patch {
    export interface Dto extends Pick<SelfControl, 'activivty' | 'steps' | 'props'> {}
    export interface Response extends AppBaseEntity.Response<SelfControl> {}
  }
}
