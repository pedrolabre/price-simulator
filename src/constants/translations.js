export const translations = {
  pt: {
    // Header
    appTitle: 'Simulador de Preços',
    appSubtitle: 'Simulação e análise de precificação de produtos',
    companyLabel: 'Nome da Empresa',
    companyPlaceholder: 'Nome da sua empresa...',

    // StatusBar
    totalProducts: 'Total de Produtos',
    itemsRegistered: (n) => `${n} ${n === 1 ? 'item' : 'itens'} cadastrados`,
    clear: 'Limpar',
    preview: 'Preview',
    confirmClear: (n) => `Tem certeza que deseja limpar todos os ${n} ${n === 1 ? 'produto' : 'produtos'}?`,

    // ImportSection
    importTitle: 'Importar Lista de Produtos',
    importHint: 'Exemplo: "PRODUTO,1,R$ 249,06"',
    importPlaceholder: 'Cole aqui sua lista de produtos...',
    processBtn: 'Processar Lista',

    // ConfigPanel
    configTitle: 'Configurações de Cálculo',
    defaultSupplier: 'Fornecedor Padrão',
    supplierPlaceholder: 'Nome do fornecedor...',
    freightMode: 'Modo de Cálculo do Frete',
    freightEmbedded: 'Frete embutido (calculado sobre preço)',
    freightNotEmbedded: 'Frete não embutido (calculado sobre preço + IPI)',
    embedded: 'Embutido',
    notEmbedded: 'Não Embutido',
    ipiLabel: 'IPI (%)',
    freightLabel: 'Frete (%)',
    marginLabel: 'Margem (%)',
    marginHintAdd: 'de acréscimo',
    marginHintRevert: 'para reverter',

    // ProductTable
    processedProducts: 'Produtos Processados',
    addRow: 'Adicionar',
    colNum: '#',
    colQty: 'Qtd',
    colDesc: 'Descrição',
    colSupplier: 'Fornecedor',
    colUnitPrice: 'Preço Unit.',
    colIpi: 'IPI',
    colFreight: 'Frete',
    colRealCost: 'Custo Real',
    colSalePrice: 'Preço Venda',
    colTotalCost: 'Total Custo',
    colTotalSale: 'Total Venda',
    colObs: 'Observações',
    grandTotals: 'Totais Gerais:',

    // TableRow
    obPlaceholder: 'Observações...',

    // SupplierInput
    supplierRowPlaceholder: 'Fornecedor...',

    // PreviewModal
    previewTitle: 'Preview da Simulação',
    previewClose: 'Fechar',
    totals: 'TOTAIS:',

    // ExportModal
    selectColumns: 'Selecionar Colunas',
    chooseColumns: (type) =>
      `Escolha quais colunas exportar para ${type === 'csv' ? 'Excel (.xls)' : type === 'html' ? 'HTML' : 'PDF'}`,
    selectAll: 'Selecionar Tudo',
    deselectAll: 'Desmarcar Tudo',
    colsSelected: (n, total) => `${n} de ${total} colunas selecionadas`,
    cancel: 'Cancelar',
    exportBtn: (type) => `Exportar ${type === 'csv' ? 'Excel (.xls)' : type === 'html' ? 'HTML' : 'PDF'}`,

    // Columns list
    columnLabels: {
      numero: '#',
      quantidade: 'Qtd',
      descricao: 'Descrição',
      fornecedor: 'Fornecedor',
      precoUnitario: 'Preço Unitário',
      ipi: 'IPI',
      frete: 'Frete',
      custoRealUnitario: 'Custo Real Unit.',
      precoVendaUnitario: 'Preço Venda Unit.',
      totalCusto: 'Total Custo',
      totalVenda: 'Total Venda',
      observacoes: 'Observações',
    },

    // Exports (generators)
    reportTitle: 'Simulador de Preços',
    reportSubtitle: 'Relatório de Análise de Produtos',
    configLabel: 'Configurações:',
    embedded_short: '(Embutido)',
    notEmbedded_short: '(Não Embutido)',
    marginLabel_short: 'Margem',
    grandTotalsLabel: 'TOTAIS GERAIS:',
    generatedAt: (date, time) => `Gerado em ${date} às ${time}`,
    products_badge: (n) => `${n} ${n === 1 ? 'produto' : 'produtos'}`,
    printOrientation: 'Orientação:',
    portrait: '🖼️ Retrato',
    landscape: '📄 Paisagem',
    printBtn: '🖨️ Imprimir / Salvar PDF',
    xlsSheetName: 'Simulação',
    popupBlocked: 'O navegador bloqueou a janela de impress\u00e3o. Libere pop-ups para este site na barra de endere\u00e7os e tente novamente.',

    // ExcelXLS col labels
    xlsColLabels: {
      numero: '#',
      quantidade: 'Qtd',
      descricao: 'Descrição',
      fornecedor: 'Fornecedor',
      precoUnitario: 'Preço Unit.',
      ipi: 'IPI',
      frete: 'Frete',
      custoRealUnitario: 'Custo Real Unit.',
      precoVendaUnitario: 'Preço Venda Unit.',
      totalCusto: 'Total Custo',
      totalVenda: 'Total Venda',
      observacoes: 'Observações',
    },
  },

  en: {
    // Header
    appTitle: 'Price Simulator',
    appSubtitle: 'Product pricing and simulation tool',
    companyLabel: 'Company Name',
    companyPlaceholder: 'Your company name...',

    // StatusBar
    totalProducts: 'Total Products',
    itemsRegistered: (n) => `${n} ${n === 1 ? 'item' : 'items'} registered`,
    clear: 'Clear',
    preview: 'Preview',
    confirmClear: (n) => `Are you sure you want to clear all ${n} ${n === 1 ? 'product' : 'products'}?`,

    // ImportSection
    importTitle: 'Import Product List',
    importHint: 'Example: "PRODUCT,1,$ 249.06"',
    importPlaceholder: 'Paste your product list here...',
    processBtn: 'Process List',

    // ConfigPanel
    configTitle: 'Calculation Settings',
    defaultSupplier: 'Default Supplier',
    supplierPlaceholder: 'Supplier name...',
    freightMode: 'Freight Calculation Mode',
    freightEmbedded: 'Freight embedded (calculated on price)',
    freightNotEmbedded: 'Freight not embedded (calculated on price + tax)',
    embedded: 'Embedded',
    notEmbedded: 'Not Embedded',
    ipiLabel: 'Tax (%)',
    freightLabel: 'Freight (%)',
    marginLabel: 'Margin (%)',
    marginHintAdd: 'markup',
    marginHintRevert: 'to revert',

    // ProductTable
    processedProducts: 'Processed Products',
    addRow: 'Add Row',
    colNum: '#',
    colQty: 'Qty',
    colDesc: 'Description',
    colSupplier: 'Supplier',
    colUnitPrice: 'Unit Price',
    colIpi: 'Tax',
    colFreight: 'Freight',
    colRealCost: 'Real Cost',
    colSalePrice: 'Sale Price',
    colTotalCost: 'Total Cost',
    colTotalSale: 'Total Sale',
    colObs: 'Notes',
    grandTotals: 'Grand Totals:',

    // TableRow
    obPlaceholder: 'Notes...',

    // SupplierInput
    supplierRowPlaceholder: 'Supplier...',

    // PreviewModal
    previewTitle: 'Simulation Preview',
    previewClose: 'Close',
    totals: 'TOTALS:',

    // ExportModal
    selectColumns: 'Select Columns',
    chooseColumns: (type) =>
      `Choose which columns to export to ${type === 'csv' ? 'Excel (.xls)' : type === 'html' ? 'HTML' : 'PDF'}`,
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    colsSelected: (n, total) => `${n} of ${total} columns selected`,
    cancel: 'Cancel',
    exportBtn: (type) => `Export ${type === 'csv' ? 'Excel (.xls)' : type === 'html' ? 'HTML' : 'PDF'}`,

    // Columns list
    columnLabels: {
      numero: '#',
      quantidade: 'Qty',
      descricao: 'Description',
      fornecedor: 'Supplier',
      precoUnitario: 'Unit Price',
      ipi: 'Tax',
      frete: 'Freight',
      custoRealUnitario: 'Real Cost Unit.',
      precoVendaUnitario: 'Sale Price Unit.',
      totalCusto: 'Total Cost',
      totalVenda: 'Total Sale',
      observacoes: 'Notes',
    },

    // Exports (generators)
    reportTitle: 'Price Simulator',
    reportSubtitle: 'Product Analysis Report',
    configLabel: 'Settings:',
    embedded_short: '(Embedded)',
    notEmbedded_short: '(Not Embedded)',
    marginLabel_short: 'Margin',
    grandTotalsLabel: 'GRAND TOTALS:',
    generatedAt: (date, time) => `Generated on ${date} at ${time}`,
    products_badge: (n) => `${n} ${n === 1 ? 'product' : 'products'}`,
    printOrientation: 'Orientation:',
    portrait: '🖼️ Portrait',
    landscape: '📄 Landscape',
    printBtn: '🖨️ Print / Save as PDF',
    xlsSheetName: 'Simulation',
    popupBlocked: 'The browser blocked the print window. Allow popups for this site from the address bar and try again.',

    // ExcelXLS col labels
    xlsColLabels: {
      numero: '#',
      quantidade: 'Qty',
      descricao: 'Description',
      fornecedor: 'Supplier',
      precoUnitario: 'Unit Price',
      ipi: 'Tax',
      frete: 'Freight',
      custoRealUnitario: 'Real Cost Unit.',
      precoVendaUnitario: 'Sale Price Unit.',
      totalCusto: 'Total Cost',
      totalVenda: 'Total Sale',
      observacoes: 'Notes',
    },
  },
};
