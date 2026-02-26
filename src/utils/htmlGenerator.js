function sumTotals(products, calculations) {
  return products.reduce((acc, product) => {
    const calc = calculations[product.id];
    return {
      totalPreco: acc.totalPreco + (product.preco * product.quantidade),
      totalIPI:   acc.totalIPI   + (calc.ipiValue * product.quantidade),
      totalFrete: acc.totalFrete + (calc.freteValue * product.quantidade),
      totalCusto: acc.totalCusto + calc.totalCustoReal,
      totalVenda: acc.totalVenda + calc.totalPrecoVista
    };
  }, { totalPreco: 0, totalIPI: 0, totalFrete: 0, totalCusto: 0, totalVenda: 0 });
}

export function generateHTML(products, calculations, config, selectedColumns = {}) {
  const allColumns = {
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
    observacoes: 'Observações'
  };

  const hasSelection = Object.values(selectedColumns).some(v => v);
  const cols = hasSelection ? selectedColumns : Object.keys(allColumns).reduce((acc, key) => ({ ...acc, [key]: true }), {});
  const cl = config.t ? config.t.xlsColLabels : allColumns;

  const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const totalsCalc = sumTotals(products, calculations);

  let headerCells = '';
  if (cols.numero) headerCells += `<th style="width:3%">${cl.numero}</th>`;
  if (cols.quantidade) headerCells += `<th style="width:4%">${cl.quantidade}</th>`;
  if (cols.descricao) headerCells += `<th style="width:18%">${cl.descricao}</th>`;
  if (cols.fornecedor) headerCells += `<th style="width:11%">${cl.fornecedor}</th>`;
  if (cols.precoUnitario) headerCells += `<th style="width:8%;text-align:right">${cl.precoUnitario}</th>`;
  if (cols.ipi) headerCells += `<th style="width:7%;text-align:right">${cl.ipi}</th>`;
  if (cols.frete) headerCells += `<th style="width:7%;text-align:right">${cl.frete}</th>`;
  if (cols.custoRealUnitario) headerCells += `<th style="width:9%;text-align:right">${cl.custoRealUnitario}</th>`;
  if (cols.precoVendaUnitario) headerCells += `<th style="width:9%;text-align:right">${cl.precoVendaUnitario}</th>`;
  if (cols.totalCusto) headerCells += `<th style="width:9%;text-align:right">${cl.totalCusto}</th>`;
  if (cols.totalVenda) headerCells += `<th style="width:9%;text-align:right">${cl.totalVenda}</th>`;
  if (cols.observacoes) headerCells += `<th style="width:15%">${cl.observacoes}</th>`;

  // Montar linhas de dados
  let dataRows = '';
  products.forEach((product, index) => {
    const calc = calculations[product.id];
    const rowBg = index % 2 === 0 ? '#ffffff' : '#f9fafb';
    dataRows += `<tr style="background:${rowBg}">`;
    if (cols.numero) dataRows += `<td style="text-align:center;color:#6b7280;font-weight:500">${index + 1}</td>`;
    if (cols.quantidade) dataRows += `<td style="text-align:center">${product.quantidade}</td>`;
    if (cols.descricao) dataRows += `<td style="font-weight:500;color:#111827">${product.descricao}</td>`;
    if (cols.fornecedor) dataRows += `<td style="color:#374151">${product.fornecedor || '-'}</td>`;
    if (cols.precoUnitario) dataRows += `<td style="text-align:right">R$ ${product.preco.toFixed(2)}</td>`;
    if (cols.ipi) dataRows += `<td style="text-align:right;color:#6b7280">R$ ${calc.ipiValue.toFixed(2)}</td>`;
    if (cols.frete) dataRows += `<td style="text-align:right;color:#6b7280">R$ ${calc.freteValue.toFixed(2)}</td>`;
    if (cols.custoRealUnitario) dataRows += `<td style="text-align:right;font-weight:600">R$ ${calc.custoRealUnitario.toFixed(2)}</td>`;
    if (cols.precoVendaUnitario) dataRows += `<td style="text-align:right;font-weight:600;color:#16a34a">R$ ${calc.precoVistaUnitario.toFixed(2)}</td>`;
    if (cols.totalCusto) dataRows += `<td style="text-align:right;font-weight:700;background:#fffbeb;color:#92400e">R$ ${calc.totalCustoReal.toFixed(2)}</td>`;
    if (cols.totalVenda) dataRows += `<td style="text-align:right;font-weight:700;background:#f0fdf4;color:#166534">R$ ${calc.totalPrecoVista.toFixed(2)}</td>`;
    if (cols.observacoes) dataRows += `<td style="color:#6b7280;font-style:italic">${product.observacoes || ''}</td>`;
    dataRows += `</tr>`;
  });

  // Montar linha de totais
  let colspanCount = 0;
  if (cols.numero) colspanCount++;
  if (cols.quantidade) colspanCount++;
  if (cols.descricao) colspanCount++;
  if (cols.fornecedor) colspanCount++;

  let totalsRow = '<tr style="background:linear-gradient(135deg,#FDB913,#FFCA3A);font-weight:700;font-size:14px;color:#78350f">';
  if (colspanCount > 0) totalsRow += `<td colspan="${colspanCount}" style="text-align:right;padding:14px 10px;letter-spacing:0.5px">${config.t ? config.t.grandTotalsLabel : 'TOTAIS GERAIS:'}</td>`;
  if (cols.precoUnitario) totalsRow += `<td style="text-align:right;padding:14px 10px">R$ ${totalsCalc.totalPreco.toFixed(2)}</td>`;
  if (cols.ipi) totalsRow += `<td style="text-align:right;padding:14px 10px">R$ ${totalsCalc.totalIPI.toFixed(2)}</td>`;
  if (cols.frete) totalsRow += `<td style="text-align:right;padding:14px 10px">R$ ${totalsCalc.totalFrete.toFixed(2)}</td>`;
  if (cols.custoRealUnitario) totalsRow += `<td style="padding:14px 10px"></td>`;
  if (cols.precoVendaUnitario) totalsRow += `<td style="padding:14px 10px"></td>`;
  if (cols.totalCusto) totalsRow += `<td style="text-align:right;padding:14px 10px">R$ ${totalsCalc.totalCusto.toFixed(2)}</td>`;
  if (cols.totalVenda) totalsRow += `<td style="text-align:right;padding:14px 10px">R$ ${totalsCalc.totalVenda.toFixed(2)}</td>`;
  if (cols.observacoes) totalsRow += `<td style="padding:14px 10px"></td>`;
  totalsRow += '</tr>';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${config.t ? config.t.reportTitle : 'Simulador de Preços'} — ${date}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f3f4f6; padding: 24px; color: #1f2937; }
    .container { background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.12); max-width: 1400px; margin: 0 auto; overflow: hidden; }
    .top-bar { display: flex; align-items: center; justify-content: space-between; background: linear-gradient(135deg, #C8102E, #E31837); padding: 20px 32px; gap: 24px; }
    .title-block { display: flex; align-items: baseline; gap: 12px; }
    h1 { color: white; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; white-space: nowrap; }
    .subtitle { color: rgba(255,255,255,0.75); font-size: 12px; white-space: nowrap; }
    .empresa { color: white; font-size: 16px; font-weight: 700; border-left: 2px solid rgba(255,255,255,0.5); padding-left: 12px; white-space: nowrap; }
    .info-block { display: flex; align-items: center; gap: 16px; }
    .info-text { font-size: 12px; color: rgba(255,255,255,0.9); text-align: right; line-height: 1.7; }
    .info-text strong { color: white; }
    .badge { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; white-space: nowrap; }
    .table-wrapper { padding: 24px; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 14px; }
    thead tr { background: linear-gradient(135deg, #1f2937, #374151); }
    th { color: white; padding: 13px 10px; text-align: left; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.4px; word-break: break-word; }
    td { border-bottom: 1px solid #f3f4f6; padding: 11px 10px; font-size: 14px; word-break: break-word; overflow-wrap: break-word; }
    tbody tr:hover { background: #f8fafc !important; }
    .footer { padding: 16px 32px 20px; font-size: 11px; color: #9ca3af; border-top: 1px solid #f3f4f6; text-align: right; }
    @media print { body { background: white; padding: 0; } .container { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-bar">
      <div class="title-block">
        <h1>${config.t ? config.t.reportTitle : 'Simulador de Preços'}</h1>
        ${config.empresa ? `<span class="empresa">${config.empresa}</span>` : ''}
        <span class="subtitle">${config.t ? config.t.reportSubtitle : 'Relatório de Análise de Produtos'}</span>
      </div>
      <div class="info-block">
        <div class="info-text">
          <strong>${config.t ? config.t.configLabel : 'Configurações:'}</strong>
          IPI: ${config.ipi}% &nbsp;|&nbsp; Frete: ${config.frete}% ${config.freteEmbutido ? (config.t ? config.t.embedded_short : '(Embutido)') : (config.t ? config.t.notEmbedded_short : '(Não Embutido)')} &nbsp;|&nbsp; ${config.t ? config.t.marginLabel.replace(' (%)', '') : 'Margem'}: +${config.margem}% / -${(config.margem / (100 + config.margem) * 100).toFixed(2)}%
        </div>
        <div class="badge">${config.t ? config.t.products_badge(products.length) : `${products.length} ${products.length === 1 ? 'produto' : 'produtos'}`}</div>
      </div>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${dataRows}</tbody>
        <tfoot>${totalsRow}</tfoot>
      </table>
    </div>
    <div class="footer">${config.t ? config.t.generatedAt(date, '') : `Gerado em ${date}`} &nbsp;&bull;&nbsp; ${config.t ? config.t.reportTitle : 'Simulador de Preços'}</div>
  </div>
</body>
</html>`;
}
