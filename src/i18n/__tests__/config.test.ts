import { describe, expect, it } from 'vitest'

import { defaultLocale, isRtl, isValidLocale, locales } from '../config'

describe('i18n config', () => {
  it('has 10 locales', () => {
    expect(locales).toHaveLength(10)
  })

  it('default locale is en', () => {
    expect(defaultLocale).toBe('en')
  })

  it('isValidLocale returns true for supported locales', () => {
    expect(isValidLocale('en')).toBe(true)
    expect(isValidLocale('ja')).toBe(true)
    expect(isValidLocale('ar')).toBe(true)
  })

  it('isValidLocale returns false for unsupported locales', () => {
    expect(isValidLocale('xx')).toBe(false)
    expect(isValidLocale('')).toBe(false)
  })

  it('isRtl returns true only for Arabic', () => {
    expect(isRtl('ar')).toBe(true)
    expect(isRtl('en')).toBe(false)
    expect(isRtl('ja')).toBe(false)
  })
})
