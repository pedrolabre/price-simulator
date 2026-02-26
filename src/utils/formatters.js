export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatNumber(value, decimals = 2) {
  return value.toFixed(decimals);
}

export function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}