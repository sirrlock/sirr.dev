import { beforeEach, describe, expect, it } from 'vitest'

import { remToPx } from '../remToPx'

describe('remToPx', () => {
  beforeEach(() => {
    // Set root font size for jsdom which defaults to empty string
    document.documentElement.style.fontSize = '16px'
  })

  it('converts rem to px using 16px root font size', () => {
    expect(remToPx(1)).toBe(16)
    expect(remToPx(2)).toBe(32)
    expect(remToPx(0.5)).toBe(8)
    expect(remToPx(0.25)).toBe(4)
  })

  it('returns 0 for 0 rem', () => {
    expect(remToPx(0)).toBe(0)
  })
})
