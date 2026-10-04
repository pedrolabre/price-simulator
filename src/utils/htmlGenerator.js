import { countTotalsLabelColumns, getColumnLabel, getSelectedReportColumns } from '../constants/columns';
import { calculateTotals } from './calculations';
import { getReportColumnValue, getReportTotalValue } from './exportRows';
import { formatMoney, formatReverseMargin } from './formatters';

function formatPercent(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function getColumnWeight(column) {
  const width = Number.parseFloat(column.htmlWidth || column.pdfWidth);
  return Number.isFinite(width) && width > 0 ? width : 1;
}

function renderDataCell(column, value) {
  const moneyColumns = [
    'precoUnitario',
    'ipi',
    'frete',
    'custoRealUnitario',
    'precoVendaUnitario',
    'totalCusto',
    'totalVenda'
  ];

  const classes = [
    moneyColumns.includes(column.key) ? 'money' : '',
    column.key === 'descricao' ? 'desc' : '',
    column.key === 'custoRealUnitario' ? 'strong' : '',
    column.key === 'precoVendaUnitario' ? 'sale' : '',
    column.key === 'totalCusto' ? 'total-cost' : '',
    column.key === 'totalVenda' ? 'total-sale' : '',
    column.key === 'observacoes' ? 'obs' : '',
    column.key === 'numero' || column.key === 'quantidade' ? 'center' : ''
  ].filter(Boolean).join(' ');

  return `<td class="${classes}">${value}</td>`;
}

export function generateHTML(products, calculations, config, selectedColumns = {}) {
  const columns = getSelectedReportColumns(selectedColumns);
  const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const totalsCalc = calculateTotals(products, calculations);

  const totalColumnWeight = columns.reduce((sum, column) => sum + getColumnWeight(column), 0);
  const columnWidths = columns.map(column => `${(getColumnWeight(column) / totalColumnWeight * 100).toFixed(3)}%`);
  const colGroup = `<colgroup>${columnWidths.map(width => `<col style="width:${width}">`).join('')}</colgroup>`;

  const tableHeader = `<tr>${columns.map(column => {
    const alignClass = column.align === 'right' ? ' class="money"' : column.align === 'center' ? ' class="center"' : '';
    return `<th${alignClass}>${getColumnLabel(config.t, column, 'export')}</th>`;
  }).join('')}</tr>`;

  const tableRows = products.map((product, index) => {
    const calc = calculations[product.id];
    const cells = columns.map(column =>
      renderDataCell(column, getReportColumnValue(column.key, product, calc, index, formatMoney))
    ).join('');

    return `<tr>${cells}</tr>`;
  }).join('');

  const colspanCount = countTotalsLabelColumns(columns);
  let totalsRow = '<tr>';

  if (colspanCount > 0) {
    totalsRow += `<td colspan="${colspanCount}" class="totals-label">${config.t ? config.t.grandTotalsLabel : 'TOTAIS GERAIS:'}</td>`;
  }

  totalsRow += columns
    .filter(column => !column.totalsLabelColumn)
    .map(column => {
      const totalValue = getReportTotalValue(column.key, totalsCalc, formatMoney);
      const classes = [
        totalValue ? 'money' : '',
        column.key === 'totalCusto' ? 'total-cost' : '',
        column.key === 'totalVenda' ? 'total-sale' : ''
      ].filter(Boolean).join(' ');

      return `<td class="${classes}">${totalValue}</td>`;
    })
    .join('');
  totalsRow += '</tr>';

  const freightEmbeddedText = config.freteEmbutido
    ? (config.t ? config.t.embedded_short : '(Embutido)')
    : (config.t ? config.t.notEmbedded_short : '(Não Embutido)');
  const freightInfo = `Frete: ${formatPercent(config.frete)}% ${freightEmbeddedText}`;
  const marginLabel = config.t ? config.t.marginLabel.replace(' (%)', '') : 'Margem';
  const marginInfo = `${marginLabel}: +${formatPercent(config.margem)}% / -${formatReverseMargin(config.margem)}%`;
  const configText = `<strong>${config.t ? config.t.configLabel : 'Configurações:'}</strong> IPI: ${formatPercent(config.ipi)}% &nbsp;|&nbsp; ${freightInfo} &nbsp;|&nbsp; ${marginInfo}`;

  return `<!DOCTYPE html>
<html lang="${config.t?.reportTitle === 'Price Simulator' ? 'en' : 'pt-BR'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.t ? config.t.reportTitle : 'Simulador de Preços'} — ${date}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 16px 20px;
      overflow-x: hidden;
      background: #f4f5f7;
      color: #111827;
      font-family: Arial, Helvetica, sans-serif;
      -webkit-text-size-adjust: 100%;
      min-height: 100vh;
    }

    .report {
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 24px;
      background: #fff;
      border: 1px solid #dfe3e8;
      border-radius: 0;
      box-shadow: none;
    }

    .report-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      padding-bottom: 18px;
      border-bottom: 3px solid #cf1026;
      flex-wrap: wrap;
    }

    .title {
      display: flex;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }

    .title h1 {
      margin: 0;
      color: #cf1026;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }

    .title .empresa {
      color: #111827;
      font-size: 14px;
      font-weight: 700;
      border-left: 2px solid #cf1026;
      padding-left: 10px;
    }

    .title .subtitle {
      color: #596273;
      font-size: 13px;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: right;
      font-size: 12px;
      color: #374151;
      line-height: 1.6;
      flex-wrap: wrap;
    }

    .meta strong {
      color: #111827;
    }

    .badge {
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid #cf1026;
      border-radius: 0;
      background: #cf1026;
      color: #fff;
      font-weight: 700;
      font-size: 12px;
      box-shadow: none;
      white-space: nowrap;
    }

    .table-wrap {
      margin-top: 18px;
      overflow-x: auto;
      border: 1px solid #dfe3e8;
      border-radius: 0;
    }

    table {
      width: 100%;
      min-width: 0;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 12px;
    }

    th {
      padding: 10px 8px;
      background: #cf1026;
      color: #fff;
      text-align: left;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 700;
      line-height: 1.2;
      border-right: 1px solid rgba(255, 255, 255, .18);
      overflow-wrap: anywhere;
    }

    th.money {
      text-align: right;
    }

    th.center {
      text-align: center;
    }

    td {
      padding: 9px 8px;
      border-right: 1px solid #dfe3e8;
      border-bottom: 1px solid #dfe3e8;
      color: #111827;
      line-height: 1.3;
      vertical-align: top;
      overflow-wrap: anywhere;
    }

    th:last-child,
    td:last-child {
      border-right: 0;
    }

    tbody tr:nth-child(even) {
      background: #fafbfc;
    }

    tbody tr:hover {
      background: #f1f5f9;
    }

    tfoot td {
      background: #f8f9fb;
      font-weight: 800;
      border-bottom: 0;
      padding: 10px 8px;
    }

    .center {
      text-align: center;
    }

    .money {
      text-align: right;
      white-space: normal;
      font-variant-numeric: tabular-nums;
    }

    .desc {
      font-weight: 600;
      color: #111827;
    }

    .obs {
      color: #596273;
    }

    .strong {
      font-weight: 800;
      color: #111827;
    }

    .sale {
      color: #0f8a45;
      font-weight: 700;
    }

    .total-cost {
      color: #8a5a00 !important;
      background: #fff2bd !important;
      font-weight: 800;
    }

    .total-sale {
      color: #0f8a45 !important;
      background: #e9f7ef !important;
      font-weight: 800;
    }

    .totals-label {
      text-align: right;
      text-transform: uppercase;
      color: #111827;
      font-weight: 800;
    }

    .footer {
      margin-top: 18px;
      font-size: 11px;
      color: #596273;
      text-align: right;
    }

    @media screen and (max-width: 768px) {
      body {
        padding: 10px;
      }

      .report {
        padding: 14px;
      }

      .report-head {
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
        padding-bottom: 14px;
      }

      .title {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
      }

      .title h1 {
        font-size: 20px;
      }

      .meta {
        text-align: left;
        width: 100%;
        justify-content: space-between;
      }
    }

    @media print {
      body {
        background: #fff;
        padding: 0;
        overflow: visible;
      }

      .report {
        width: 100%;
        max-width: none;
        padding: 0;
        border: 0;
        box-shadow: none;
      }

      .table-wrap {
        overflow: visible;
      }

      .footer {
        display: none;
      }

      @page {
        margin: 8mm;
      }
    }
  </style>
</head>
<body>
  <main class="report">
    <header class="report-head">
      <div class="title">
        <h1>${config.t ? config.t.reportTitle : 'Simulador de Preços'}</h1>
        ${config.empresa ? `<span class="empresa">${config.empresa}</span>` : ''}
        <span class="subtitle">${config.t ? config.t.reportSubtitle : 'Relatório de Análise de Produtos'}</span>
      </div>
      <div class="meta">
        <div class="config-text">
          ${configText}
        </div>
        <span class="badge">${config.t ? config.t.products_badge(products.length) : `${products.length} ${products.length === 1 ? 'produto' : 'produtos'}`}</span>
      </div>
    </header>

    <div class="table-wrap">
      <table>
        ${colGroup}
        <thead>${tableHeader}</thead>
        <tbody>${tableRows}</tbody>
        <tfoot>${totalsRow}</tfoot>
      </table>
    </div>

    <div class="footer">${config.t ? config.t.generatedAt(date, '') : `Gerado em ${date}`} &bull; ${config.t ? config.t.reportTitle : 'Simulador de Preços'}</div>
  </main>
</body>
</html>`;
}
