import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TPAdminHomeI18n } from 'pages/PAdminHome';
import { TPAdminPromptsI18n } from 'pages/PAdminPrompt';
import { TPAdminUserProfileI18n } from 'pages/PAdminUserProfile';
import { TPAdminUserProfileNutritionI18n } from 'pages/PAdminUserProfileNutrition';
import { TPDietI18n } from 'pages/PDiet';
import { TTrainingAdditionBlockI18n } from 'widgets/WAdditionCard';
import { TWAdminFooterNavBarI18n } from 'widgets/WAdminFooterNavBar';
import { TWAdminNewFoodI18n } from 'widgets/WAdminNewFood';
import { TWAdminNewNutritionI18n } from 'widgets/WAdminNewNutrition/i18n';
import { TFooterNavigationBarI18n } from 'widgets/WFooterNavBar';
import { TWNewTrainingI18n } from 'widgets/WNewTraining';
import { TWPromptCreationI18n } from 'widgets/WPromptCreation';
import { TFNutritionListFormI18n } from 'features/FNutritionListForm';
import { TAuthFormsI18n } from 'entities/form/i18n';
import { TEAthropometricsItemI18n } from 'entities/profile/EAthropometricsItem';
import { TEProfileHeaderI18n } from 'entities/profile/EProfileHeader';
import { TEProfileCardI18n } from 'entities/profile/EUnitedProfileCard';
import { TTrainingI18n } from 'entities/trainings/ETrainingCard';
import { TGlobalI18n } from 'shared/config/i18n';
import { mergeI18n } from 'shared/lib/i18utils';
import { TSNoResultsScreenI18n } from 'shared/ui/SNoResultsScreen';

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
      TFooterNavigationBarI18n,
      TTrainingI18n,
      TTrainingAdditionBlockI18n,
      TAuthFormsI18n,
      TEProfileHeaderI18n,
      TEAthropometricsItemI18n,
      TPDietI18n,
      TWPromptCreationI18n,
      TEProfileCardI18n,
      TSNoResultsScreenI18n,
      TWNewTrainingI18n,
      TPAdminPromptsI18n,
      TFNutritionListFormI18n,
      TPAdminUserProfileNutritionI18n,
      TWAdminNewNutritionI18n,
      TWAdminNewFoodI18n,
    ),
    fallbackLocale: 'ru-RU',
  });

  // Set i18n instance on app
  app.use(i18n);
});
