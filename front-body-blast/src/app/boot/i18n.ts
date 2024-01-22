import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TFooterNavigationBarI18n } from 'widgets/WFooterNavBar';
import { TTrainingAdditionBlockI18n } from 'features/trainings/FAdditionCard';
import { TEDiaryActivityI18n } from 'entities/diary/EDiaryActivity';
import { TEDiaryHeaderI18n } from 'entities/diary/EDiaryHeader';
import { TEDiarySelfControlItemI18n } from 'entities/diary/EDiarySelfControlItem';
import { TEAthropometricsItemI18n } from 'entities/profile/EAthropometricsItem';
import { TEProfileHeaderI18n } from 'entities/profile/EProfileHeader';
import { TClientFormsI18n } from 'entities/profile/form';
import { TTrainingI18n } from 'entities/trainings/ETrainingCard';
import { mergeI18n } from 'shared/lib/i18utils';
import { TSNoResultsScreenI18n } from 'shared/ui/SNoResultsScreen';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'ru-RU',
    legacy: false,
    messages: mergeI18n(
      TFooterNavigationBarI18n,
      TTrainingI18n,
      TTrainingAdditionBlockI18n,
      TClientFormsI18n,
      TEProfileHeaderI18n,
      TEAthropometricsItemI18n,
      TEDiaryHeaderI18n,
      TEDiaryActivityI18n,
      TEDiarySelfControlItemI18n,
      TSNoResultsScreenI18n,
    ),
    fallbackLocale: 'ru-RU',
  });

  // Set i18n instance on app
  app.use(i18n);
});
