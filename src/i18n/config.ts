export const locales = [
  'en',
  'zh',
  'es',
  'ar',
  'fr',
  'de',
  'ja',
  'pt',
  'ko',
  'ru',
] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const rtlLocales: Locale[] = ['ar']

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  pt: 'Português',
  ko: '한국어',
  ru: 'Русский',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}
