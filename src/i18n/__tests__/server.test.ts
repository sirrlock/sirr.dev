import { describe, expect, it } from 'vitest'

import { t } from '../server'

const mockTranslations = {
  meta: {
    siteTitle: 'Sirr',
  },
  nav: {
    groups: {
      guides: 'Guides',
    },
  },
  common: {
    copyright: 'Copyright {year}. All rights reserved.',
    readMore: 'Read more',
  },
}

describe('t (translate)', () => {
  it('resolves nested keys', () => {
    expect(t(mockTranslations, 'meta.siteTitle')).toBe('Sirr')
    expect(t(mockTranslations, 'nav.groups.guides')).toBe('Guides')
  })

  it('returns key for missing translations', () => {
    expect(t(mockTranslations, 'missing.key')).toBe('missing.key')
  })

  it('interpolates params', () => {
    expect(t(mockTranslations, 'common.copyright', { year: 2026 })).toBe(
      'Copyright 2026. All rights reserved.',
    )
  })

  it('returns string without modification when no params needed', () => {
    expect(t(mockTranslations, 'common.readMore')).toBe('Read more')
  })
})
