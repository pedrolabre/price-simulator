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

export function generateXLS(products, calculations, config, selectedColumns = {}) {
  const hasSelection = Object.values(selectedColumns).some(v => v);
  const cols = hasSelection ? selectedColumns : {
    numero: true, quantidade: true, descricao: true, fornecedor: true,
    precoUnitario: true, ipi: true, frete: true, custoRealUnitario: true,
    precoVendaUnitario: true, totalCusto: true, totalVenda: true, observacoes: true
  };

  const cl2 = config.t ? config.t.xlsColLabels : null;
  const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const reductionPct = config.margem > 0 ? (config.margem / (100 + config.margem) * 100).toFixed(2) : '0.00';

  const fmtR = (val) => `R$ ${val.toFixed(2).replace('.', ',')}`;
  const esc = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const colDefs = [];
  if (cols.numero)             colDefs.push({ key: 'numero',             label: cl2 ? cl2.numero : '#',                    width: 40,  align: 'center' });
  if (cols.quantidade)         colDefs.push({ key: 'quantidade',         label: cl2 ? cl2.quantidade : 'Qtd',              width: 80,  align: 'center' });
  if (cols.descricao)          colDefs.push({ key: 'descricao',          label: cl2 ? cl2.descricao : 'Descrição', width: 220, align: 'left'   });
  if (cols.fornecedor)         colDefs.push({ key: 'fornecedor',         label: cl2 ? cl2.fornecedor : 'Fornecedor',       width: 150, align: 'left'   });
  if (cols.precoUnitario)      colDefs.push({ key: 'precoUnitario',      label: cl2 ? cl2.precoUnitario : 'Preço Unit.', width: 110, align: 'right' });
  if (cols.ipi)                colDefs.push({ key: 'ipi',                label: cl2 ? cl2.ipi : 'IPI',                    width: 100, align: 'right'  });
  if (cols.frete)              colDefs.push({ key: 'frete',              label: cl2 ? cl2.frete : 'Frete',                width: 100, align: 'right'  });
  if (cols.custoRealUnitario)  colDefs.push({ key: 'custoRealUnitario',  label: cl2 ? cl2.custoRealUnitario : 'Custo Real Unit.', width: 130, align: 'right' });
  if (cols.precoVendaUnitario) colDefs.push({ key: 'precoVendaUnitario', label: cl2 ? cl2.precoVendaUnitario : 'Preço Venda Unit.', width: 135, align: 'right' });
  if (cols.totalCusto)         colDefs.push({ key: 'totalCusto',         label: cl2 ? cl2.totalCusto : 'Total Custo',     width: 120, align: 'right'  });
  if (cols.totalVenda)         colDefs.push({ key: 'totalVenda',         label: cl2 ? cl2.totalVenda : 'Total Venda',     width: 120, align: 'right'  });
  if (cols.observacoes)        colDefs.push({ key: 'observacoes',        label: cl2 ? cl2.observacoes : 'Observações', width: 180, align: 'left' });

  const colCount = colDefs.length;
  const colgroups = colDefs.map(c => `<col style="width:${c.width}px;mso-width-source:userset;">`).join('');

  // Cabe\u00e7alho de colunas
  const thStyle = (align) => `background:#1f2937;color:white;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;padding:10px 8px;text-align:${align};border:1px solid #374151;white-space:nowrap;`;
  const headerRow = colDefs.map(c => `<th style="${thStyle(c.align)}">${esc(c.label)}</th>`).join('');

  // Linhas de dados
  let dataRows = '';
  products.forEach((product, index) => {
    const calc = calculations[product.id];
    const bg = index % 2 === 0 ? '#ffffff' : '#f3f4f6';
    const td = (content, extraStyle = '') =>
      `<td style="padding:9px 8px;border:1px solid #e5e7eb;background:${bg};font-size:13px;${extraStyle}">${content}</td>`;

    const cells = [];
    if (cols.numero)           cells.push(td(index + 1, 'text-align:center;color:#6b7280;font-weight:600;'));
    if (cols.quantidade)       cells.push(td(product.quantidade, 'text-align:center;'));
    if (cols.descricao)        cells.push(td(esc(product.descricao), 'font-weight:600;color:#111827;'));
    if (cols.fornecedor)       cells.push(td(esc(product.fornecedor || '-'), 'color:#374151;'));
    if (cols.precoUnitario)    cells.push(td(fmtR(product.preco), 'text-align:right;'));
    if (cols.ipi)              cells.push(td(fmtR(calc.ipiValue), 'text-align:right;color:#6b7280;'));
    if (cols.frete)            cells.push(td(fmtR(calc.freteValue), 'text-align:right;color:#6b7280;'));
    if (cols.custoRealUnitario) cells.push(td(fmtR(calc.custoRealUnitario), 'text-align:right;font-weight:700;'));
    if (cols.precoVendaUnitario) cells.push(td(fmtR(calc.precoVistaUnitario), 'text-align:right;font-weight:700;color:#166534;'));
    if (cols.totalCusto)       cells.push(`<td style="padding:9px 8px;border:1px solid #e5e7eb;background:#fffbeb;color:#92400e;font-weight:700;text-align:right;font-size:13px;">${fmtR(calc.totalCustoReal)}</td>`);
    if (cols.totalVenda)       cells.push(`<td style="padding:9px 8px;border:1px solid #e5e7eb;background:#f0fdf4;color:#166534;font-weight:700;text-align:right;font-size:13px;">${fmtR(calc.totalPrecoVista)}</td>`);
    if (cols.observacoes)      cells.push(td(esc(product.observacoes || ''), 'color:#6b7280;font-style:italic;'));
    dataRows += `<tr>${cells.join('')}</tr>`;
  });

  const totalsCalc = sumTotals(products, calculations);

  let labelCols = 0;
  if (cols.numero) labelCols++;
  if (cols.quantidade) labelCols++;
  if (cols.descricao) labelCols++;
  if (cols.fornecedor) labelCols++;

  const totStyle = `background:#FDB913;color:#78350f;font-weight:700;padding:11px 8px;border:1px solid #e5a000;font-size:13px;`;
  let totalsRow = '<tr>';
  if (labelCols > 0) totalsRow += `<td colspan="${labelCols}" style="${totStyle}text-align:right;letter-spacing:0.5px;">${config.t ? config.t.grandTotalsLabel : 'TOTAIS GERAIS:'}</td>`;
  if (cols.precoUnitario)      totalsRow += `<td style="${totStyle}text-align:right;">${fmtR(totalsCalc.totalPreco)}</td>`;
  if (cols.ipi)                totalsRow += `<td style="${totStyle}text-align:right;">${fmtR(totalsCalc.totalIPI)}</td>`;
  if (cols.frete)              totalsRow += `<td style="${totStyle}text-align:right;">${fmtR(totalsCalc.totalFrete)}</td>`;
  if (cols.custoRealUnitario)  totalsRow += `<td style="${totStyle}"></td>`;
  if (cols.precoVendaUnitario) totalsRow += `<td style="${totStyle}"></td>`;
  if (cols.totalCusto)         totalsRow += `<td style="${totStyle}text-align:right;">${fmtR(totalsCalc.totalCusto)}</td>`;
  if (cols.totalVenda)         totalsRow += `<td style="${totStyle}text-align:right;">${fmtR(totalsCalc.totalVenda)}</td>`;
  if (cols.observacoes)        totalsRow += `<td style="${totStyle}"></td>`;
  totalsRow += '</tr>';

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${config.t ? config.t.xlsSheetName : 'Simula\u00e7\u00e3o'}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>body{font-family:'Segoe UI',Calibri,Arial,sans-serif;font-size:13px;}table{border-collapse:collapse;}</style>
</head>
<body>
<table>
  <colgroup>${colgroups}</colgroup>
  <tr>
    <td colspan="${colCount}" style="background:#C8102E;color:white;font-size:15px;font-weight:700;padding:12px 10px;letter-spacing:-0.3px;border:none;">&#9899; ${config.t ? config.t.reportTitle : 'Simulador de Pre\u00e7os'}${config.empresa ? ` &mdash; <span style="font-size:14px;">${esc(config.empresa)}</span>` : ''} &mdash; ${config.t ? config.t.reportSubtitle : 'Relat\u00f3rio de An\u00e1lise de Produtos'}</td>
  </tr>
  <tr>
    <td colspan="${colCount}" style="background:#a00020;color:rgba(255,255,255,0.9);font-size:11px;padding:6px 10px;border:none;">
      ${config.t ? config.t.generatedAt(date, time) : `Gerado em ${date} \u00e0s ${time}`} &nbsp;|&nbsp; IPI: ${config.ipi}% &nbsp;|&nbsp; Frete: ${config.frete}% ${config.freteEmbutido ? (config.t ? config.t.embedded_short : '(Embutido)') : (config.t ? config.t.notEmbedded_short : '(N\u00e3o Embutido)')} &nbsp;|&nbsp; ${config.t ? config.t.marginLabel.replace(' (%)', '') : 'Margem'}: +${config.margem}% / -${reductionPct}% &nbsp;|&nbsp; ${config.t ? config.t.products_badge(products.length) : `${products.length} produto${products.length !== 1 ? 's' : ''}`}
    </td>
  </tr>
  <tr><td colspan="${colCount}" style="padding:5px;background:#f3f4f6;border:none;"></td></tr>
  <tr>${headerRow}</tr>
  ${dataRows}
  ${totalsRow}
</table>
</body>
</html>`;
}