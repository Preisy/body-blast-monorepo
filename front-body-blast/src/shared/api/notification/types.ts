import { AppBaseEntity } from '../base';

export interface Notification {
  text: string;
}

export namespace Notification {
  export namespace Get {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response
      extends AppBaseEntity.Response<{
        notifications: Array<Notification>;
      }> {}
  }
}
