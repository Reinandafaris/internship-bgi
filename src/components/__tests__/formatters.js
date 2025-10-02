export function formatCurrency(value) {
  if (typeof value !== 'number') {
    return 'Rp 0'
  }
  return `Rp ${value.toLocaleString('id-ID')}`
}
