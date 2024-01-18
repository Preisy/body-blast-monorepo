import { mergeI18n } from 'shared/lib/i18utils';
import { TEBodyParamsFormI18n } from './EBodyParamsSignUpForm';
import { TCredentialsFormI18n } from './ECredentialsSignUpForm';
import { TEDiseasesFormI18n } from './EDiseasesSignUpForm';
import { TEForbiddensFormI18n } from './EForbiddensSignUpForm';
import { TELoginFormI18n } from './ELoginForm';
import { TEMotivationsFormI18n } from './EMotivationsSignUpForm';

export const TAuthFormsI18n = mergeI18n(
  TEBodyParamsFormI18n,
  TEDiseasesFormI18n,
  TEForbiddensFormI18n,
  TELoginFormI18n,
  TCredentialsFormI18n,
  TEMotivationsFormI18n,
);
