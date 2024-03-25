export type Locale = 'ru-RU' | 'en-US';

interface Messages {
  [key: string]: Messages | string | Record<string, unknown>;
}

export type I18nMessages = {
  [locale in Locale]: {
    [key: string]: Messages | string | Record<string, unknown>;
  };
};
