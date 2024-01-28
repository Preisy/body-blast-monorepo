import merge from 'lodash/merge';
import { I18nMessages } from './types';

export function mergeI18n(...i18ns: I18nMessages[]) {
  const merged: I18nMessages = i18ns.shift()!;
  for (const i18n of i18ns) {
    merge(merged, i18n);
  }
  return merged;
}
