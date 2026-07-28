import { calculateReverseMargin } from './calculations';

export function formatMoney(value, { decimalSeparator = '.' } = {}) {
  const formatted = Number(value || 0).toFixed(2);
  const normalized = decimalSeparator === ',' ? formatted.replace('.', ',') : formatted;

  return `R$ ${normalized}`;
}

export function formatReverseMargin(margem, { clampNonPositive = false } = {}) {
  const numericMargin = Number(margem || 0);

  if (clampNonPositive && numericMargin <= 0) {
    return '0.00';
  }

  return calculateReverseMargin(numericMargin).toFixed(2);
}
