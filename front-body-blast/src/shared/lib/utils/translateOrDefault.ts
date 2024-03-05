import { useI18n } from 'vue-i18n';

//Translate Or Default
export function tod(key: string) {
  const { t, te } = useI18n();
  //By default returns last component of key
  return te(key) ? t(key) : key.split('.').at(-1)!;
}
