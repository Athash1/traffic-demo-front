import { defineStore } from 'pinia'
interface Ilanguage {
  language: string
}

export const useLangStore = defineStore('lang', {
  state: (): Ilanguage => {
      return {
        language: sessionStorage.getItem('localeLang') || 'en',
      }
  },
  actions: {
    changeLang(data: 'en' | 'ja') {
      this.language = data
    },
  },
})