export * from './api/service';
export * from './api/admin-service';

export * from './model/store';
export * from './model/types';
export * from './model/admin-store';
export * from './model/admin-types';

import eu from './i18n/en';
import ru from './i18n/ru';

export const TWorkoutI18n = {
  'en-US': eu,
  'ru-RU': ru,
};

export { default as EWorkoutExerciseCard } from './ui/EWorkoutExerciseCard.vue';
export * from './ui/EWorkoutExerciseCard.vue';
