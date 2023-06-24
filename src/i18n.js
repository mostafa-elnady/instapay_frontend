import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import transalteEn from "./locale/en.json";
import transalteAr from "./locale/ar.json";
const resources = {
  en: {
    translation: transalteEn,
  },
  ar: {
    translation: transalteAr,
  },
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    // backend: {
    //   loadPath: "./locale/{{lng}}/translation.json",
    // },
  });

export default i18n;
