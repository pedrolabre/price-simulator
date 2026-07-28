import { countTotalsLabelColumns, getColumnLabel, getSelectedReportColumns } from '../constants/columns';
import { calculateTotals } from './calculations';
import { getReportColumnValue, getReportTotalValue } from './exportRows';
import { formatMoney, formatReverseMargin } from './formatters';

const fmtR = (val) => formatMoney(val, { decimalSeparator: ',' });
const esc = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderDataCell(column, value, bg) {
  const td = (content, extraStyle = '') =>
    `<td style="padding:9px 8px;border:1px solid #e5e7eb;background:${bg};font-size:13px;${extraStyle}">${content}</td>`;

  if (column.key === 'numero') return td(value, 'text-align:center;color:#6b7280;font-weight:600;');
  if (column.key === 'quantidade') return td(value, 'text-align:center;');
  if (column.key === 'descricao') return td(esc(value), 'font-weight:600;color:#111827;');
  if (column.key === 'fornecedor') return td(esc(value), 'color:#374151;');
  if (column.key === 'precoUnitario') return td(value, 'text-align:right;');
  if (column.key === 'ipi') return td(value, 'text-align:right;color:#6b7280;');
  if (column.key === 'frete') return td(value, 'text-align:right;color:#6b7280;');
  if (column.key === 'custoRealUnitario') return td(value, 'text-align:right;font-weight:700;');
  if (column.key === 'precoVendaUnitario') return td(value, 'text-align:right;font-weight:700;color:#166534;');
  if (column.key === 'totalCusto') return `<td style="padding:9px 8px;border:1px solid #e5e7eb;background:#fffbeb;color:#92400e;font-weight:700;text-align:right;font-size:13px;">${value}</td>`;
  if (column.key === 'totalVenda') return `<td style="padding:9px 8px;border:1px solid #e5e7eb;background:#f0fdf4;color:#166534;font-weight:700;text-align:right;font-size:13px;">${value}</td>`;
  if (column.key === 'observacoes') return td(esc(value), 'color:#6b7280;font-style:italic;');

  return '';
}

export function generateXLS(products, calculations, config, selectedColumns = {}) {
  const columns = getSelectedReportColumns(selectedColumns);
  const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const reductionPct = formatReverseMargin(config.margem, { clampNonPositive: true });

  const colDefs = columns.map(column => ({
    key: column.key,
    label: getColumnLabel(config.t, column, 'export'),
    width: column.xlsWidth,
    align: column.xlsAlign
  }));

  const colCount = colDefs.length;
  const colgroups = colDefs.map(c => `<col style="width:${c.width}px;mso-width-source:userset;">`).join('');

  const thStyle = (align) => `background:#1f2937;color:white;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;padding:10px 8px;text-align:${align};border:1px solid #374151;white-space:nowrap;`;
  const headerRow = colDefs.map(c => `<th style="${thStyle(c.align)}">${esc(c.label)}</th>`).join('');

  let dataRows = '';
  products.forEach((product, index) => {
    const calc = calculations[product.id];
    const bg = index % 2 === 0 ? '#ffffff' : '#f3f4f6';
    const cells = columns.map(column =>
      renderDataCell(column, getReportColumnValue(column.key, product, calc, index, fmtR), bg)
    );
    dataRows += `<tr>${cells.join('')}</tr>`;
  });

  const totalsCalc = calculateTotals(products, calculations);
  const labelCols = countTotalsLabelColumns(columns);

  const totStyle = `background:#FDB913;color:#78350f;font-weight:700;padding:11px 8px;border:1px solid #e5a000;font-size:13px;`;
  let totalsRow = '<tr>';
  if (labelCols > 0) totalsRow += `<td colspan="${labelCols}" style="${totStyle}text-align:right;letter-spacing:0.5px;">${config.t ? config.t.grandTotalsLabel : 'TOTAIS GERAIS:'}</td>`;
  totalsRow += columns
    .filter(column => !column.totalsLabelColumn)
    .map(column => {
      const totalValue = getReportTotalValue(column.key, totalsCalc, fmtR);
      const totalAlign = totalValue ? 'text-align:right;' : '';
      return `<td style="${totStyle}${totalAlign}">${totalValue}</td>`;
    })
    .join('');
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
