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
  const tableHeader = `<tr>${columns.map(column => {
    const alignClass = column.align === 'right' ? ' class="money"' : column.align === 'center' ? ' class="center"' : '';
    return `<th${alignClass} style="width:${column.pdfWidth}">${getColumnLabel(config.t, column, 'export')}</th>`;
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
          padding: 28px;
          background: #f4f5f7;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
        }

        .report {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px;
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
          overflow: auto;
          border: 1px solid #dfe3e8;
          border-radius: 0;
        }

        table {
          width: 100%;
          min-width: 860px;
          border-collapse: collapse;
          font-size: 12px;
        }

        th {
          padding: 12px 10px;
          background: #cf1026;
          color: #fff;
          text-align: left;
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 700;
          border-right: 1px solid rgba(255, 255, 255, .18);
        }

        td {
          padding: 11px 10px;
          border-right: 1px solid #dfe3e8;
          border-bottom: 1px solid #dfe3e8;
          color: #111827;
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
          white-space: nowrap;
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

        @media print {
          body {
            background: #fff;
            padding: 0;
          }

          .report {
            max-width: none;
            padding: 0;
            border: 0;
            box-shadow: none;
          }

          .footer {
            display: none;
          }

          @page {
            size: landscape;
            margin: 10mm;
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
