import { createI18n } from "vue-i18n";
import fa from "@/i18n/fa/index";
import en from "@/i18n/en/index";

const i18n = createI18n({
  legacy: false,
  locale: "fa",
  globalInjection: true,
  fallbackLocale: "en",
  messages: { fa, en },
});

export default i18n;
