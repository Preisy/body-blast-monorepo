import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TPAdminHomeI18n } from 'pages/admin/home';
import { TPAdminVideoI18n } from 'pages/admin/learning';
import { TPAdminUserProfileNutritionI18n } from 'pages/admin/nutrition';
import { TPAdminPromptsI18n } from 'pages/admin/prompt';
import { TPAdminUserProfileI18n } from 'pages/admin/user-profile';
import { TPDietI18n } from 'pages/diet';
import { TWAdminDiaryI18n } from 'widgets/admin/diary';
import { TWAdminFooterNavBarI18n } from 'widgets/admin/footer';
import { TWAdminLearningI18n } from 'widgets/admin/learning';
import { TWAdminNutritionI18n } from 'widgets/admin/nutrition';
import { TWPromptCreationI18n } from 'widgets/admin/prompt';
import { TWNewTrainingI18n } from 'widgets/admin/trainings';
import { TFooterNavigationBarI18n } from 'widgets/footer';
import { TTrainingAdditionBlockI18n } from 'widgets/trainings';
import { TFRemoveDialogI18n } from 'features/dialogs';
import { TFNotificationI18n } from 'features/notification';
import { TFNutritionListFormI18n } from 'features/nutrition-list-form';
import { TEDiaryI18n } from 'entities/diary';
import { TAuthFormsI18n } from 'entities/form/i18n';
import { TEProfileI18n } from 'entities/profile';
import { TTrainingI18n } from 'entities/trainings';
import { TGlobalI18n } from 'shared/config/i18n';
import { mergeI18n } from 'shared/lib/i18utils';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'ru-RU',
    legacy: false,
    messages: mergeI18n(
      TPAdminHomeI18n,
      TFooterNavigationBarI18n,
      TPAdminUserProfileI18n,
      TWAdminFooterNavBarI18n,
      TGlobalI18n,
      TTrainingI18n,
      TTrainingAdditionBlockI18n,
      TAuthFormsI18n,
      TEProfileI18n,
      TPDietI18n,
      TEDiaryI18n,
      TWPromptCreationI18n,
      TWAdminDiaryI18n,
      TWNewTrainingI18n,
      TPAdminPromptsI18n,
      TFNutritionListFormI18n,
      TPAdminUserProfileNutritionI18n,
      TWAdminNutritionI18n,
      TFRemoveDialogI18n,
      TPAdminVideoI18n,
      TWAdminLearningI18n,
      TFNotificationI18n,
    ),
    fallbackLocale: 'ru-RU',
  });

  // Set i18n instance on app
  app.use(i18n);
});
