export type NotificationTypes = 'diary' | 'anthropometrics';
export interface Notification extends Record<NotificationTypes, boolean> {}

export namespace Notification {
  export namespace Get {
    export interface Response extends Notification {}
  }
}
