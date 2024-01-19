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
}

export namespace SelfControl {
  export interface Prop extends AppBaseEntity {
    label: string;
    value: number;
    selfControlId: number;
  }

  export namespace Get {
    export interface Dto extends AppPagination.DateDto {}
    export interface Response extends AppPagination.Response<SelfControl> {}
  }

  export namespace GetById {
    export interface Response extends SelfControl {
      user: User;
      props: Array<Prop>;
    }
  }

  export namespace Patch {
    export interface Dto {
      props: Array<SelfControl.Prop>;
      steps: number;
      activity: string;
    }
    export interface Response {}
  }
}
