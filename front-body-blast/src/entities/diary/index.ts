export * from './api/service';
export * from './api/admin-service';

export * from './model/store';
export * from './model/types';
export * from './model/admin-store';
export * from './model/admin-types';

import en from './i18n/en';
import ru from './i18n/ru';

export const TEDiaryI18n = {
  'en-US': en,
  'ru-RU': ru,
};

export { default as EDiaryHeader } from './ui/EDiaryHeader.vue';
export { default as ESelfControlItem } from './ui/ESelfControlItem.vue';
export { default as ESelfControlList } from './ui/ESelfControlList.vue';
export { default as EStepsList } from './ui/EStepsList.vue';
