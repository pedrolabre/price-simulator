export const REPORT_COLUMNS = [
  {
    key: 'numero',
    tableLabelKey: 'colNum',
    tableHeaderClassName: 'w-10 text-center',
    previewHeaderClassName: 'w-10',
    align: 'center',
    fallbackLabel: '#',
    selectionFallbackLabel: '#',
    exportFallbackLabel: '#',
    htmlWidth: '3%',
    pdfWidth: '3%',
    xlsWidth: 40,
    xlsAlign: 'center',
    totalsLabelColumn: true
  },
  {
    key: 'quantidade',
    tableLabelKey: 'colQty',
    tableHeaderClassName: 'w-[70px] text-center',
    previewHeaderClassName: 'w-[70px]',
    align: 'center',
    fallbackLabel: 'Qtd',
    selectionFallbackLabel: 'Qtd',
    exportFallbackLabel: 'Qtd',
    htmlWidth: '4%',
    pdfWidth: '4%',
    xlsWidth: 80,
    xlsAlign: 'center',
    totalsLabelColumn: true
  },
  {
    key: 'descricao',
    tableLabelKey: 'colDesc',
    tableHeaderClassName: 'w-[250px]',
    previewHeaderClassName: 'w-[250px]',
    align: 'left',
    fallbackLabel: 'Descri\u00e7\u00e3o',
    selectionFallbackLabel: 'Descri\u00e7\u00e3o',
    exportFallbackLabel: 'Descri\u00e7\u00e3o',
    htmlWidth: '18%',
    pdfWidth: '18%',
    xlsWidth: 220,
    xlsAlign: 'left',
    totalsLabelColumn: true
  },
  {
    key: 'fornecedor',
    tableLabelKey: 'colSupplier',
    tableHeaderClassName: 'w-[140px]',
    previewHeaderClassName: 'w-[140px]',
    align: 'left',
    fallbackLabel: 'Fornecedor',
    selectionFallbackLabel: 'Fornecedor',
    exportFallbackLabel: 'Fornecedor',
    htmlWidth: '11%',
    pdfWidth: '12%',
    xlsWidth: 150,
    xlsAlign: 'left',
    totalsLabelColumn: true
  },
  {
    key: 'precoUnitario',
    tableLabelKey: 'colUnitPrice',
    tableHeaderClassName: 'w-[110px] text-right',
    previewHeaderClassName: 'w-[110px]',
    align: 'right',
    fallbackLabel: 'Pre\u00e7o Unit.',
    selectionFallbackLabel: 'Pre\u00e7o Unit\u00e1rio',
    exportFallbackLabel: 'Pre\u00e7o Unit.',
    htmlWidth: '8%',
    pdfWidth: '8%',
    xlsWidth: 110,
    xlsAlign: 'right'
  },
  {
    key: 'ipi',
    tableLabelKey: 'colIpi',
    tableHeaderClassName: 'w-[92px] text-right',
    previewHeaderClassName: 'w-[92px]',
    align: 'right',
    fallbackLabel: 'IPI',
    selectionFallbackLabel: 'IPI',
    exportFallbackLabel: 'IPI',
    htmlWidth: '7%',
    pdfWidth: '7%',
    xlsWidth: 100,
    xlsAlign: 'right'
  },
  {
    key: 'frete',
    tableLabelKey: 'colFreight',
    tableHeaderClassName: 'w-[92px] text-right',
    previewHeaderClassName: 'w-[92px]',
    align: 'right',
    fallbackLabel: 'Frete',
    selectionFallbackLabel: 'Frete',
    exportFallbackLabel: 'Frete',
    htmlWidth: '7%',
    pdfWidth: '7%',
    xlsWidth: 100,
    xlsAlign: 'right'
  },
  {
    key: 'custoRealUnitario',
    tableLabelKey: 'colRealCost',
    tableHeaderClassName: 'w-[110px] text-right',
    previewHeaderClassName: 'w-[110px]',
    align: 'right',
    fallbackLabel: 'Custo Real',
    selectionFallbackLabel: 'Custo Real Unit.',
    exportFallbackLabel: 'Custo Real Unit.',
    htmlWidth: '9%',
    pdfWidth: '9%',
    xlsWidth: 130,
    xlsAlign: 'right'
  },
  {
    key: 'precoVendaUnitario',
    tableLabelKey: 'colSalePrice',
    tableHeaderClassName: 'w-[112px] text-right',
    previewHeaderClassName: 'w-[112px]',
    align: 'right',
    fallbackLabel: 'Pre\u00e7o Venda',
    selectionFallbackLabel: 'Pre\u00e7o Venda Unit.',
    exportFallbackLabel: 'Pre\u00e7o Venda Unit.',
    htmlWidth: '9%',
    pdfWidth: '9%',
    xlsWidth: 135,
    xlsAlign: 'right'
  },
  {
    key: 'totalCusto',
    tableLabelKey: 'colTotalCost',
    tableHeaderClassName: 'w-[112px] text-right',
    previewHeaderClassName: 'w-[112px]',
    tableHeaderTone: 'cost',
    align: 'right',
    fallbackLabel: 'Total Custo',
    selectionFallbackLabel: 'Total Custo',
    exportFallbackLabel: 'Total Custo',
    htmlWidth: '9%',
    pdfWidth: '9%',
    xlsWidth: 120,
    xlsAlign: 'right'
  },
  {
    key: 'totalVenda',
    tableLabelKey: 'colTotalSale',
    tableHeaderClassName: 'w-[112px] text-right',
    previewHeaderClassName: 'w-[112px]',
    tableHeaderTone: 'sale',
    align: 'right',
    fallbackLabel: 'Total Venda',
    selectionFallbackLabel: 'Total Venda',
    exportFallbackLabel: 'Total Venda',
    htmlWidth: '9%',
    pdfWidth: '9%',
    xlsWidth: 120,
    xlsAlign: 'right'
  },
  {
    key: 'observacoes',
    tableLabelKey: 'colObs',
    tableHeaderClassName: 'w-[150px]',
    previewHeaderClassName: 'w-[150px]',
    align: 'left',
    fallbackLabel: 'Observa\u00e7\u00f5es',
    selectionFallbackLabel: 'Observa\u00e7\u00f5es',
    exportFallbackLabel: 'Observa\u00e7\u00f5es',
    htmlWidth: '15%',
    pdfWidth: '15%',
    xlsWidth: 180,
    xlsAlign: 'left'
  }
];

export function createColumnSelection(selected = true) {
  return REPORT_COLUMNS.reduce((selection, column) => {
    selection[column.key] = selected;
    return selection;
  }, {});
}

export function normalizeSelectedColumns(selectedColumns = {}) {
  const hasSelection = Object.values(selectedColumns).some(Boolean);

  return REPORT_COLUMNS.reduce((selection, column) => {
    selection[column.key] = hasSelection ? Boolean(selectedColumns[column.key]) : true;
    return selection;
  }, {});
}

export function getSelectedReportColumns(selectedColumns = {}) {
  const normalizedSelection = normalizeSelectedColumns(selectedColumns);
  return REPORT_COLUMNS.filter(column => normalizedSelection[column.key]);
}

export function getColumnLabel(t, column, variant = 'export') {
  if (variant === 'table') {
    return t?.[column.tableLabelKey] || column.fallbackLabel;
  }

  if (variant === 'selection') {
    return t?.columnLabels?.[column.key] || column.selectionFallbackLabel;
  }

  return t?.xlsColLabels?.[column.key] || column.exportFallbackLabel;
}

export function countTotalsLabelColumns(columns) {
  return columns.filter(column => column.totalsLabelColumn).length;
}
