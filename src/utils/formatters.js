import { calculateReverseMargin } from './calculations';

export function parseNumberInput(value) {
  const raw = String(value || '').trim();
  if (!raw) return 0;

  if (raw.includes(',')) {
    return parseFloat(raw.replace(/\./g, '').replace(',', '.')) || 0;
  }

  const dots = (raw.match(/\./g) || []).length;
  if (dots > 1) {
    const lastDot = raw.lastIndexOf('.');
    return parseFloat(`${raw.slice(0, lastDot).replace(/\./g, '')}.${raw.slice(lastDot + 1)}`) || 0;
  }

  return parseFloat(raw) || 0;
}

export function formatNumberInput(value, { maximumFractionDigits = 2 } = {}) {
  return Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits
  });
}

export function formatMoney(value, { decimalSeparator = ',' } = {}) {
  const formatted = Number(value || 0).toLocaleString(decimalSeparator === ',' ? 'pt-BR' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return `R$ ${formatted}`;
}

export function formatReverseMargin(margem, { clampNonPositive = false } = {}) {
  const numericMargin = Number(margem || 0);

  if (clampNonPositive && numericMargin <= 0) {
    return '0.00';
  }

  return calculateReverseMargin(numericMargin).toFixed(2);
}
