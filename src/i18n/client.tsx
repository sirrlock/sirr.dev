'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from 'react'

import { isRtl, type Locale } from './config'

interface LocaleContextValue {
  locale: Locale
  t: (key: string, params?: Record<string, string | number>) => string
  translations: Record<string, unknown>
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  locale,
  translations,
  children,
}: {
  locale: Locale
  translations: Record<string, unknown>
  children: ReactNode
}) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = isRtl(locale) ? 'rtl' : 'ltr'
  }, [locale])

  const tFn = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
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
    },
    [translations],
  )

  return (
    <LocaleContext.Provider value={{ locale, t: tFn, translations }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return ctx
}
