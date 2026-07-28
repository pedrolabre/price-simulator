import { formatMoney } from './formatters';

export function getReportColumnValue(columnKey, product, calculation, index, moneyFormatter = formatMoney) {
  switch (columnKey) {
    case 'numero':
      return index + 1;
    case 'quantidade':
      return product.quantidade;
    case 'descricao':
      return product.descricao;
    case 'fornecedor':
      return product.fornecedor || '-';
    case 'precoUnitario':
      return moneyFormatter(product.preco);
    case 'ipi':
      return moneyFormatter(calculation.ipiValue);
    case 'frete':
      return moneyFormatter(calculation.freteValue);
    case 'custoRealUnitario':
      return moneyFormatter(calculation.custoRealUnitario);
    case 'precoVendaUnitario':
      return moneyFormatter(calculation.precoVistaUnitario);
    case 'totalCusto':
      return moneyFormatter(calculation.totalCustoReal);
    case 'totalVenda':
      return moneyFormatter(calculation.totalPrecoVista);
    case 'observacoes':
      return product.observacoes || '';
    default:
      return '';
  }
}

export function getReportTotalValue(columnKey, totals, moneyFormatter = formatMoney) {
  switch (columnKey) {
    case 'precoUnitario':
      return moneyFormatter(totals.totalPrecoOriginal);
    case 'ipi':
      return moneyFormatter(totals.totalIPI);
    case 'frete':
      return moneyFormatter(totals.totalFrete);
    case 'totalCusto':
      return moneyFormatter(totals.totalCustoReal);
    case 'totalVenda':
      return moneyFormatter(totals.totalPrecoVista);
    default:
      return '';
  }
}
