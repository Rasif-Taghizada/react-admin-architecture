import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import en from "@/assets/locales/en.json";
import ru from "@/assets/locales/ru.json";
import az from "@/assets/locales/az.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    az: { translation: az },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: localStorage.getItem("lang") || "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;