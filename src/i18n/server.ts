import { type Locale, defaultLocale } from './config'

const translationCache = new Map<Locale, Record<string, unknown>>()

export async function getTranslations(
  locale: Locale,
): Promise<Record<string, unknown>> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!
  }

  try {
    const translations = (await import(`./translations/${locale}.json`))
      .default
    translationCache.set(locale, translations)
    return translations
  } catch {
    if (locale !== defaultLocale) {
      return getTranslations(defaultLocale)
    }
    return {}
  }
}

export function t(
  translations: Record<string, unknown>,
  key: string,
  params?: Record<string, string | number>,
): string {
  const keys = key.split('.')
  let value: unknown = translations
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  if (typeof value !== 'string') return key
  if (!params) return value
  return value.replace(
    /\{(\w+)\}/g,
    (_, name) => String(params[name] ?? `{${name}}`),
  )
}
