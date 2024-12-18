import i18next from "i18next";
import en from "@locales/en/ns.json";
import ru from "@locales/ru/ns.json";
import { LanguageDetector } from "i18next-http-middleware";

/**
 * Установить модуль для мультиязычности через i18next
 */
export const setupMultilingualism = () => {
  i18next.use(LanguageDetector).init({
    fallbackLng: "ru", // Язык по умолчанию
    defaultNS: "ns", // Локализация по умолчанию
    resources: {
      en: { ns: en },
      ru: { ns: ru },
    },
  });
};
