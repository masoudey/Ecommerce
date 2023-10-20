import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { english, farsi } from '../constant/translations.json';

export const resources = {
    en: {
        translation: english,
    },
    fa: {
        translation: farsi,
    },
};

i18n.use(initReactI18next);

i18n.init({
    resources,
    lng: 'en', // default language
});

export default i18n;
