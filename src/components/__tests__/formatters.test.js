import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatters'

describe('formatCurrency', () => {
  it('should format a positive number correctly', () => {
    expect(formatCurrency(15000)).toBe('Rp 15.000')
  })

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('Rp 0')
  })

  it('should handle non-number inputs gracefully', () => {
    expect(formatCurrency('abc')).toBe('Rp 0')
    expect(formatCurrency(null)).toBe('Rp 0')
    expect(formatCurrency(undefined)).toBe('Rp 0')
  })
})
