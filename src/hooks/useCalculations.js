import { useMemo } from 'react';
import { calculateProduct, calculateTotals } from '../utils/calculations';

export function useCalculations(products, config) {
  const { ipi, frete, margem, freteEmbutido } = config;

  // Calcula cada produto individualmente
  const calculations = useMemo(() => {
    const calc = {};
    products.forEach(product => {
      calc[product.id] = calculateProduct(product, ipi, frete, margem, freteEmbutido);
    });
    return calc;
  }, [products, ipi, frete, margem, freteEmbutido]);

  // Calcula totais gerais
  const totals = useMemo(() => {
    return calculateTotals(products, calculations);
  }, [products, calculations]);

  return { calculations, totals };
}