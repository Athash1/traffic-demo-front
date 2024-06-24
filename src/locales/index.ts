import { createI18n } from 'vue-i18n'

import ja from '@/locales/ja'
import en from '@/locales/en'

const i18n = createI18n({
  globalInjection: true,
  fallbackLocale: 'en',
  legacy: false,
  locale: sessionStorage.getItem('localeLang') || 'en',
  messages: {
    en,
    ja,
  },
})
export default i18n