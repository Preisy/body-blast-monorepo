import { EventBus } from 'quasar';
import { NotificationTypes } from './types';

export const notificationBus = new EventBus<{
  notify: (newType: NotificationTypes) => void;
  'notification-hide': () => void;
}>();
