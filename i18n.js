import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./assets/language/english.json";
import am from "./assets/language/amharic.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
i18n.use(initReactI18next).init({
  lng: "en",
  compatibilityJSON: "v3",
  fallbackLng: "en",
  resources: {
    am: am,
    en: en,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    // useSuspense: false,
  },
});

export default i18n;
