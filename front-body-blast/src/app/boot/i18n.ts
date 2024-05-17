import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TFooterNavigationBarI18n } from 'processes/layouts';
import { TPLearningI18n } from 'pages/learning';
import { TPNutritionI18n } from 'pages/nutrition';
import { TPAdminPromptsI18n } from 'pages/prompt';
import { TPUserI18n } from 'pages/user';
import { TWDiaryI18n } from 'widgets/diary';
import { TWAdminLearningI18n } from 'widgets/learning';
import { TWidgetDietI18n } from 'widgets/nutrition';
import { TWPromptCreationI18n } from 'widgets/prompt';
import { TWidgetWorkoutI18n } from 'widgets/workout';
import { TFNotificationI18n } from 'features/notification';
import { TFNutritionListFormI18n } from 'features/nutrition';
import { TEDiaryI18n } from 'entities/diary';
import { TEProfileI18n } from 'entities/user';
import { TWorkoutI18n } from 'entities/workout';
import { TGlobalI18n } from 'shared/config/i18n';
import { mergeI18n } from 'shared/lib';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'ru-RU',
    legacy: false,
    messages: mergeI18n(
      TFooterNavigationBarI18n,
      TPUserI18n,
      TGlobalI18n,
      TWorkoutI18n,
      TWidgetWorkoutI18n,
      TEProfileI18n,
      TPNutritionI18n,
      TEDiaryI18n,
      TWPromptCreationI18n,
      TPAdminPromptsI18n,
      TFNutritionListFormI18n,
      TWidgetDietI18n,
      TPLearningI18n,
      TWAdminLearningI18n,
      TFNotificationI18n,
      TWDiaryI18n,
    ),
    fallbackLocale: 'ru-RU',
  });

  // Set i18n instance on app
  app.use(i18n);
});
