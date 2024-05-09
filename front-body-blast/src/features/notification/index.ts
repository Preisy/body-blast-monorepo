export * from './api/service';

export * from './model/store';
export * from './model/types';
export * from './model/bus';

import en from './i18n/en';
import ru from './i18n/ru';

export const TFNotificationI18n = {
  'en-US': en,
  'ru-RU': ru,
};

export { default as FNotification } from './ui/FNotification.vue';
