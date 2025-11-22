import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './translations/en'
import { sv } from './translations/sv'

// Custom language detection function
function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en'

  const browserLang = navigator.language || (navigator as any).userLanguage || 'en'
  const langCode = browserLang.toLowerCase().split('-')[0]

  if (langCode === 'sv') {
    return 'sv'
  }
  if (langCode === 'en') {
    return 'en'
  }
  return 'en' // Default to English
}

// Get initial language from localStorage or detect from browser
function getInitialLanguage(): string {
  if (typeof window === 'undefined') return 'en'
  
  const saved = localStorage.getItem('language')
  if (saved === 'en' || saved === 'sv') {
    return saved
  }
  
  return detectBrowserLanguage()
}

const initialLanguage = getInitialLanguage()

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    sv: {
      translation: sv,
    },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

// Save initial language to localStorage if not already saved
if (typeof window !== 'undefined' && !localStorage.getItem('language')) {
  localStorage.setItem('language', initialLanguage)
}

// Listen for language changes and persist to localStorage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lng)
  }
})

export default i18n

