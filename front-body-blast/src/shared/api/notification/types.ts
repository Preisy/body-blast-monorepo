import { AppBaseEntity } from '../base';

export type NotificationTypes = 'diary' | 'anthropometrics';
export interface Notification extends Record<NotificationTypes, boolean> {}

export namespace Notification {
  export namespace Get {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<Notification> {}
  }
}
