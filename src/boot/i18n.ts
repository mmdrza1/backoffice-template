import { createI18n } from "vue-i18n";
import faIR from '@/i18n/fa';
import enGB from '@/i18n/en'
// import enGB from 'src/locales/en-GB';

const i18n = createI18n({
  locale: 'en-GB',
  legacy: false,
  fallbackLocale: 'fa-IR',
  messages: { faIR, enGB },
});

export default i18n;
