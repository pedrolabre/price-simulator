import { countTotalsLabelColumns, getColumnLabel, getSelectedReportColumns } from '../constants/columns';
import { getReportColumnValue, getReportTotalValue } from './exportRows';
import { formatMoney } from './formatters';

function formatPercent(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
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
    column.key === 'custoRealUnitario' ? 'strong' : '',
    column.key === 'precoVendaUnitario' ? 'sale' : '',
    column.key === 'totalCusto' ? 'total-cost' : '',
    column.key === 'totalVenda' ? 'total-sale' : '',
    column.key === 'numero' || column.key === 'quantidade' ? 'center' : ''
  ].filter(Boolean).join(' ');

  return `<td class="${classes}">${value}</td>`;
}

function getColumnWeight(column) {
  const width = Number.parseFloat(column.pdfWidth);
  return Number.isFinite(width) && width > 0 ? width : 1;
}

export function generatePDF(products, calculations, totals, config, selectedColumns = {}) {
  let printWindow;

  try {
    printWindow = window.open('', '_blank');
  } catch (error) {
    console.error('Nao foi possivel abrir a janela de impressao:', error);
  }

  if (!printWindow) {
    window.alert(config.t ? config.t.popupBlocked : 'O navegador bloqueou a janela de impressao. Libere pop-ups para este site na barra de enderecos e tente novamente.');
    return;
  }

  const columns = getSelectedReportColumns(selectedColumns);
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
      const totalValue = getReportTotalValue(column.key, totals, formatMoney);
      const classes = [
        totalValue ? 'money' : '',
        column.key === 'totalCusto' ? 'total-cost' : '',
        column.key === 'totalVenda' ? 'total-sale' : ''
      ].filter(Boolean).join(' ');

      return `<td class="${classes}">${totalValue}</td>`;
    })
    .join('');
  totalsRow += '</tr>';

  const configText = `${config.t ? config.t.configLabel : 'Configuracoes:'} IPI ${formatPercent(config.ipi)}% | Frete ${formatPercent(config.frete)}% | ${config.t ? config.t.marginLabel : 'Margem (%)'} +${formatPercent(config.margem)}%`;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${config.t ? config.t.reportTitle : 'Simulador de Precos'}</title>
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
          padding: 18px;
          overflow-x: hidden;
          background: #f4f5f7;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
          -webkit-text-size-adjust: 100%;
        }

        .report {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
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
          font-size: 25px;
          font-weight: 700;
        }

        .title span {
          color: #596273;
          font-size: 13px;
        }

        .meta {
          text-align: right;
          font-size: 12px;
          color: #374151;
          line-height: 1.6;
        }

        .badge {
          display: inline-block;
          margin-left: 10px;
          padding: 8px 12px;
          border: 1px solid #cf1026;
          border-radius: 0;
          background: #cf1026;
          color: #fff;
          font-weight: 700;
          box-shadow: none;
          white-space: nowrap;
        }

        .table-wrap {
          margin-top: 18px;
          overflow: hidden;
          border: 1px solid #dfe3e8;
          border-radius: 0;
        }

        table {
          width: 100%;
          min-width: 0;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: 11px;
        }

        th {
          padding: 10px 6px;
          background: #cf1026;
          color: #fff;
          text-align: left;
          text-transform: uppercase;
          font-size: 8px;
          font-weight: 700;
          line-height: 1.2;
          border-right: 1px solid rgba(255, 255, 255, .18);
          overflow-wrap: anywhere;
        }

        td {
          padding: 8px 6px;
          border-right: 1px solid #dfe3e8;
          border-bottom: 1px solid #dfe3e8;
          color: #111827;
          line-height: 1.25;
          vertical-align: top;
          overflow-wrap: anywhere;
        }

        th:last-child,
        td:last-child {
          border-right: 0;
        }

        tfoot td {
          background: #f8f9fb;
          font-weight: 800;
          border-bottom: 0;
        }

        .center {
          text-align: center;
        }

        .money {
          text-align: right;
          white-space: normal;
          font-variant-numeric: tabular-nums;
        }

        .strong {
          font-weight: 800;
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
        }

        .footer {
          margin-top: 20px;
          text-align: center;
        }

        .print {
          border: 1px solid #cf1026;
          border-radius: 0;
          padding: 11px 17px;
          background: #cf1026;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          box-shadow: none;
        }

        @media screen and (max-width: 700px) {
          body {
            padding: 10px;
          }

          .report {
            padding: 14px;
          }

          .report-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
            padding-bottom: 12px;
          }

          .title {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
          }

          .title h1 {
            font-size: 18px;
            line-height: 1.1;
          }

          .title span {
            font-size: 10px;
          }

          .meta {
            text-align: left;
            font-size: 9px;
            line-height: 1.4;
          }

          .badge {
            margin-left: 0;
            margin-top: 6px;
            padding: 5px 7px;
            font-size: 8px;
          }

          .table-wrap {
            margin-top: 12px;
          }

          table {
            font-size: 6px;
          }

          th {
            padding: 4px 2px;
            font-size: 4.8px;
            line-height: 1.05;
          }

          td {
            padding: 4px 2px;
            font-size: 5.8px;
            line-height: 1.12;
          }

          .totals-label {
            font-size: 5.2px;
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

          table {
            width: 100%;
            min-width: 0;
            table-layout: fixed;
            font-size: 9px;
          }

          th {
            padding: 6px 4px;
            font-size: 6.8px;
          }

          td {
            padding: 6px 4px;
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
            <h1>${config.t ? config.t.reportTitle : 'Simulador de Precos'}</h1>
            <span>${config.empresa || (config.t ? config.t.reportSubtitle : 'Relatorio de Analise de Produtos')}</span>
          </div>
          <div class="meta">
            ${configText}
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
      </main>

      <div class="footer" id="printBar">
        <button class="print" onclick="doPrint()">${config.t?.printSave || 'Imprimir / Salvar PDF'}</button>
      </div>
      <script>
        function doPrint() {
          var bar = document.getElementById('printBar');
          bar.style.display = 'none';
          window.addEventListener('afterprint', function() {
            bar.style.display = '';
          }, { once: true });
          window.print();
        }
        window.addEventListener('beforeprint', function() {
          document.getElementById('printBar').style.display = 'none';
        });
        window.addEventListener('afterprint', function() {
          document.getElementById('printBar').style.display = '';
        });
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
}
