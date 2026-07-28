import { countTotalsLabelColumns, getColumnLabel, getSelectedReportColumns } from '../constants/columns';
import { getReportColumnValue, getReportTotalValue } from './exportRows';
import { formatMoney, formatReverseMargin } from './formatters';

function renderDataCell(column, value) {
  if (column.key === 'numero') return `<td>${value}</td>`;
  if (column.key === 'quantidade') return `<td>${value}</td>`;
  if (column.key === 'descricao') return `<td>${value}</td>`;
  if (column.key === 'fornecedor') return `<td>${value}</td>`;
  if (column.key === 'precoUnitario') return `<td style="text-align:right">${value}</td>`;
  if (column.key === 'ipi') return `<td style="text-align:right">${value}</td>`;
  if (column.key === 'frete') return `<td style="text-align:right">${value}</td>`;
  if (column.key === 'custoRealUnitario') return `<td style="text-align:right"><strong>${value}</strong></td>`;
  if (column.key === 'precoVendaUnitario') return `<td style="text-align:right"><strong>${value}</strong></td>`;
  if (column.key === 'totalCusto') return `<td style="background:#FFF8E7;text-align:right"><strong>${value}</strong></td>`;
  if (column.key === 'totalVenda') return `<td style="background:#E8F5E9;text-align:right"><strong>${value}</strong></td>`;
  if (column.key === 'observacoes') return `<td>${value}</td>`;

  return '';
}

export function generatePDF(products, calculations, totals, config, selectedColumns = {}) {
  let printWindow;

  try {
    printWindow = window.open('', '_blank');
  } catch (error) {
    console.error('N\u00e3o foi poss\u00edvel abrir a janela de impress\u00e3o:', error);
  }
  
  if (!printWindow) {
    window.alert(config.t ? config.t.popupBlocked : 'O navegador bloqueou a janela de impress\u00e3o. Libere pop-ups para este site na barra de endere\u00e7os e tente novamente.');
    return;
  }
  
  // Se nenhuma coluna foi selecionada, exporta todas
  const columns = getSelectedReportColumns(selectedColumns);
  
  // Cabeçalho da tabela com larguras fixas para table-layout: fixed
  const tableHeader = `<tr>${columns.map(column => {
    const alignStyle = column.align === 'right' ? ';text-align:right' : '';
    return `<th style="width:${column.pdfWidth}${alignStyle}">${getColumnLabel(config.t, column, 'export')}</th>`;
  }).join('')}</tr>`;

  // Linhas de dados
  let tableRows = '';
  products.forEach((product, index) => {
    const calc = calculations[product.id];
    const cells = columns.map(column =>
      renderDataCell(column, getReportColumnValue(column.key, product, calc, index, formatMoney))
    );
    tableRows += `<tr>${cells.join('')}</tr>`;
  });

  // Linha de totais
  let totalsRow = '<tr class="totals">';
  const colspanCount = countTotalsLabelColumns(columns);
  
  if (colspanCount > 0) {
    totalsRow += `<td colspan="${colspanCount}"><strong>${config.t ? config.t.grandTotalsLabel : 'TOTAIS GERAIS:'}</strong></td>`;
  }
  
  totalsRow += columns
    .filter(column => !column.totalsLabelColumn)
    .map(column => {
      const totalValue = getReportTotalValue(column.key, totals, formatMoney);
      return totalValue ? `<td><strong>${totalValue}</strong></td>` : '<td></td>';
    })
    .join('');
  totalsRow += '</tr>';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${config.t ? config.t.reportTitle : 'Simula\u00e7\u00e3o de Pre\u00e7os'}</title>
      <style>
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body { 
          font-family: 'Segoe UI', Arial, sans-serif; 
          padding: 24px; 
          color: #1f2937; 
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        }
        
        .container {
          background: white;
          padding: 24px 32px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #C8102E;
          padding-bottom: 14px;
          margin-bottom: 16px;
          gap: 24px;
        }
        
        .title-block {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-shrink: 0;
        }

        h1 { 
          color: #C8102E; 
          font-size: 22px; 
          font-weight: 700;
          letter-spacing: -0.5px;
          white-space: nowrap;
        }
        
        .subtitle { 
          color: #6b7280; 
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
        }

        .info-block {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          justify-content: flex-end;
        }
        
        .info-left { 
          font-size: 12px; 
          line-height: 1.6;
          color: #374151;
          text-align: right;
        }
        
        .info-left strong {
          color: #C8102E;
          font-weight: 600;
        }
        
        .info-badge { 
          background: linear-gradient(135deg, #C8102E 0%, #E31837 100%);
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(200, 16, 46, 0.3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 8px; 
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-radius: 12px;
          overflow: hidden;
          table-layout: fixed;
        }
        
        thead {
          background: linear-gradient(135deg, #C8102E 0%, #E31837 100%);
        }
        
        th { 
          color: white; 
          padding: 12px 10px; 
          text-align: left; 
          font-weight: 600;
          border: none;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        
        td { 
          border: 1px solid #e5e7eb; 
          padding: 11px 10px; 
          font-size: 14px;
          color: #374151;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        
        tr:nth-child(even) { 
          background: #f9fafb; 
        }
        
        tr:hover {
          background: #f3f4f6;
        }
        
        .totals { 
          background: linear-gradient(135deg, #FDB913 0%, #FFCA3A 100%) !important;
          font-weight: bold; 
          font-size: 13px;
          color: #78350f;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .totals td {
          border-color: #FDB913;
          padding: 12px 8px;
        }

        .print-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
          padding-bottom: 24px;
        }
        
        @page {
          margin: 12mm;
        }

        @media print {
          body { 
            background: white; 
            padding: 0; 
          }
          .container { 
            box-shadow: none; 
            padding: 0;
            max-width: 100%;
          }
          .print-bar { 
            display: none !important; 
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="top-bar">
          <div class="title-block">
            <h1>${config.t ? config.t.reportTitle : 'Simulador de Pre\u00e7os'}</h1>
            <span class="subtitle">${config.t ? config.t.reportSubtitle : 'Relat\u00f3rio de An\u00e1lise de Produtos'}</span>
          </div>
          <div class="info-block">
            <div class="info-left">
              <strong>${config.t ? config.t.configLabel : 'Configura\u00e7\u00f5es:'}</strong>
              IPI: ${config.ipi}% | Frete: ${config.frete}% ${config.freteEmbutido ? (config.t ? config.t.embedded_short : '(Embutido)') : (config.t ? config.t.notEmbedded_short : '(N\u00e3o Embutido)')} | ${config.t ? config.t.marginLabel.replace(' (%)', '') : 'Margem'}: +${config.margem}% / -${formatReverseMargin(config.margem)}%
            </div>
            <div class="info-badge">
              ${config.empresa ? `<div style="font-size:15px;margin-bottom:3px;">${config.empresa}</div>` : ''}
              ${config.t ? config.t.products_badge(products.length) : `${products.length} ${products.length === 1 ? 'produto' : 'produtos'}`}
            </div>
          </div>
        </div>
        
        <table>
          <thead>
            ${tableHeader}
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
          <tfoot>
            ${totalsRow}
          </tfoot>
        </table>
      </div>

      <div class="print-bar" id="printBar">
        <button onclick="doPrint()" style="padding:12px 32px;border-radius:12px;border:none;background:linear-gradient(135deg,#C8102E,#E31837);color:white;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 4px 14px rgba(200,16,46,0.35);">${config.t ? config.t.printBtn : '🖨️ Imprimir / Salvar PDF'}</button>
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
