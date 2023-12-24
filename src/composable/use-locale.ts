import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

import faIR from 'quasar/lang/fa-IR';
import enGB from 'quasar/lang/en-GB';

type SupportedLanguage = 'faIR' | 'enGB';

const langPacks = {
  faIR,
  enGB,
};

export function useLocale() {
  const locale = ref<string>('enGB');

  const $q = useQuasar();
  const i18n = useI18n({ useScope: 'global' });

  function setLocale(langIsoName: SupportedLanguage) {
    locale.value = langIsoName;
    i18n.locale.value = langIsoName;
    $q.lang.set(langPacks[langIsoName] ?? langPacks.enGB);
    localStorage.setItem('language', langIsoName);
  }

  function loadLastState() {
    const prevState = localStorage.getItem('language') as SupportedLanguage || $q.lang.getLocale() || 'enGB';
    setLocale(prevState);
  }

  return {
    locale,
    setLocale,
    loadLastState,
  };
}
