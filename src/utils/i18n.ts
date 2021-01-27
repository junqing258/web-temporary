// eslint-disable-next-line @typescript-eslint/no-unused-vars
import i18n from 'i18next';
import XhrBackend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const globalThis = require('globalthis')();

export type ValuesOf<T extends any[]> = T[number];

export type LangType = 'en' | 'zh-Hans' | 'zh-Hant';

export const supportedLngs = ['en', 'zh-Hans', 'zh-Hant'];

export const getLanguage = (): LangType => {
  return i18n.language || (typeof globalThis !== 'undefined' && globalThis.localStorage?.i18nextLng) || 'en';
};

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(XhrBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // fallbackLng: 'en',
    supportedLngs,
    // debug: true,
    // nonExplicitSupportedLngs: false,
    load: 'currentOnly',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    initImmediate: false,
    backend: {
      // loadPath: `/locales/{{lng}}/{{ns}}.json?${__LOCALES_HASH__}`,
      queryStringParams: { v: String(globalThis.__webpack_hash__).slice(-6) },
    },
  });

export default i18n;
