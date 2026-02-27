import appI18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@locales/en.json';
import hi from '@locales/hi.json';
import StorageHelper from '@utils/storageHelper';

// Get saved language or default to English
const savedLanguage = StorageHelper.getItem(
  StorageHelper.STORAGE_KEYS.LANGUAGE,
);

// eslint-disable-next-line import/no-named-as-default-member
appI18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
  },
  lng: savedLanguage || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default appI18n;
