import { countTotalsLabelColumns, getColumnLabel, getSelectedReportColumns } from '../constants/columns';
import { calculateTotals } from './calculations';
import { getReportColumnValue, getReportTotalValue } from './exportRows';
import { formatMoney, formatReverseMargin } from './formatters';

function renderDataCell(column, value) {
  if (column.key === 'numero') return `<td style="text-align:center;color:#6b7280;font-weight:500">${value}</td>`;
  if (column.key === 'quantidade') return `<td style="text-align:center">${value}</td>`;
  if (column.key === 'descricao') return `<td style="font-weight:500;color:#111827">${value}</td>`;
  if (column.key === 'fornecedor') return `<td style="color:#374151">${value}</td>`;
  if (column.key === 'precoUnitario') return `<td style="text-align:right">${value}</td>`;
  if (column.key === 'ipi') return `<td style="text-align:right;color:#6b7280">${value}</td>`;
  if (column.key === 'frete') return `<td style="text-align:right;color:#6b7280">${value}</td>`;
  if (column.key === 'custoRealUnitario') return `<td style="text-align:right;font-weight:600">${value}</td>`;
  if (column.key === 'precoVendaUnitario') return `<td style="text-align:right;font-weight:600;color:#16a34a">${value}</td>`;
  if (column.key === 'totalCusto') return `<td style="text-align:right;font-weight:700;background:#fffbeb;color:#92400e">${value}</td>`;
  if (column.key === 'totalVenda') return `<td style="text-align:right;font-weight:700;background:#f0fdf4;color:#166534">${value}</td>`;
  if (column.key === 'observacoes') return `<td style="color:#6b7280;font-style:italic">${value}</td>`;

  return '';
}

export function generateHTML(products, calculations, config, selectedColumns = {}) {
  const columns = getSelectedReportColumns(selectedColumns);
  const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const totalsCalc = calculateTotals(products, calculations);

  const headerCells = columns.map(column => {
    const alignStyle = column.align === 'right' ? ';text-align:right' : '';
    return `<th style="width:${column.htmlWidth}${alignStyle}">${getColumnLabel(config.t, column, 'export')}</th>`;
  }).join('');

  let dataRows = '';
  products.forEach((product, index) => {
    const calc = calculations[product.id];
    const rowBg = index % 2 === 0 ? '#ffffff' : '#f9fafb';
    const rowCells = columns
      .map(column => renderDataCell(column, getReportColumnValue(column.key, product, calc, index, formatMoney)))
      .join('');

    dataRows += `<tr style="background:${rowBg}">${rowCells}</tr>`;
  });

  const colspanCount = countTotalsLabelColumns(columns);
  let totalsRow = '<tr style="background:linear-gradient(135deg,#FDB913,#FFCA3A);font-weight:700;font-size:14px;color:#78350f">';
  if (colspanCount > 0) totalsRow += `<td colspan="${colspanCount}" style="text-align:right;padding:14px 10px;letter-spacing:0.5px">${config.t ? config.t.grandTotalsLabel : 'TOTAIS GERAIS:'}</td>`;
  totalsRow += columns
    .filter(column => !column.totalsLabelColumn)
    .map(column => {
      const totalValue = getReportTotalValue(column.key, totalsCalc, formatMoney);
      const totalStyle = totalValue ? 'text-align:right;padding:14px 10px' : 'padding:14px 10px';
      return `<td style="${totalStyle}">${totalValue}</td>`;
    })
    .join('');
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
          IPI: ${config.ipi}% &nbsp;|&nbsp; Frete: ${config.frete}% ${config.freteEmbutido ? (config.t ? config.t.embedded_short : '(Embutido)') : (config.t ? config.t.notEmbedded_short : '(Não Embutido)')} &nbsp;|&nbsp; ${config.t ? config.t.marginLabel.replace(' (%)', '') : 'Margem'}: +${config.margem}% / -${formatReverseMargin(config.margem)}%
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
