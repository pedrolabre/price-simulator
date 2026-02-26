export function generatePDF(products, calculations, totals, config, selectedColumns = {}) {
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert(config.t ? config.t.popupBlocked : 'Pop-up bloqueado pelo navegador. Por favor, permita pop-ups para este site e tente novamente.');
    return;
  }
  
  // Se nenhuma coluna foi selecionada, exporta todas
  const hasSelection = Object.values(selectedColumns).some(v => v);
  const cols = hasSelection ? selectedColumns : {
    numero: true,
    quantidade: true,
    descricao: true,
    fornecedor: true,
    observacoes: true,
    precoUnitario: true,
    ipi: true,
    frete: true,
    custoRealUnitario: true,
    precoVendaUnitario: true,
    totalCusto: true,
    totalVenda: true
  };
  
  // Cabeçalho da tabela com larguras fixas para table-layout: fixed
  const cl = config.t ? config.t.xlsColLabels : null;
  let tableHeader = '<tr>';
  if (cols.numero) tableHeader += `<th style="width:3%">${cl ? cl.numero : '#'}</th>`;
  if (cols.quantidade) tableHeader += `<th style="width:4%">${cl ? cl.quantidade : 'Qtd'}</th>`;
  if (cols.descricao) tableHeader += `<th style="width:18%">${cl ? cl.descricao : 'Descri\u00e7\u00e3o'}</th>`;
  if (cols.fornecedor) tableHeader += `<th style="width:12%">${cl ? cl.fornecedor : 'Fornecedor'}</th>`;
  if (cols.precoUnitario) tableHeader += `<th style="width:8%;text-align:right">${cl ? cl.precoUnitario : 'Pre\u00e7o Unit.'}</th>`;
  if (cols.ipi) tableHeader += `<th style="width:7%;text-align:right">${cl ? cl.ipi : 'IPI'}</th>`;
  if (cols.frete) tableHeader += `<th style="width:7%;text-align:right">${cl ? cl.frete : 'Frete'}</th>`;
  if (cols.custoRealUnitario) tableHeader += `<th style="width:9%;text-align:right">${cl ? cl.custoRealUnitario : 'Custo Real Unit.'}</th>`;
  if (cols.precoVendaUnitario) tableHeader += `<th style="width:9%;text-align:right">${cl ? cl.precoVendaUnitario : 'Pre\u00e7o Venda Unit.'}</th>`;
  if (cols.totalCusto) tableHeader += `<th style="width:9%;text-align:right">${cl ? cl.totalCusto : 'Total Custo'}</th>`;
  if (cols.totalVenda) tableHeader += `<th style="width:9%;text-align:right">${cl ? cl.totalVenda : 'Total Venda'}</th>`;
  if (cols.observacoes) tableHeader += `<th style="width:15%">${cl ? cl.observacoes : 'Observa\u00e7\u00f5es'}</th>`;
  tableHeader += '</tr>';

  // Linhas de dados
  let tableRows = '';
  products.forEach((product, index) => {
    const calc = calculations[product.id];
    tableRows += '<tr>';
    if (cols.numero) tableRows += `<td>${index + 1}</td>`;
    if (cols.quantidade) tableRows += `<td>${product.quantidade}</td>`;
    if (cols.descricao) tableRows += `<td>${product.descricao}</td>`;
    if (cols.fornecedor) tableRows += `<td>${product.fornecedor || '-'}</td>`;
    if (cols.precoUnitario) tableRows += `<td style="text-align:right">R$ ${product.preco.toFixed(2)}</td>`;
    if (cols.ipi) tableRows += `<td style="text-align:right">R$ ${calc.ipiValue.toFixed(2)}</td>`;
    if (cols.frete) tableRows += `<td style="text-align:right">R$ ${calc.freteValue.toFixed(2)}</td>`;
    if (cols.custoRealUnitario) tableRows += `<td style="text-align:right"><strong>R$ ${calc.custoRealUnitario.toFixed(2)}</strong></td>`;
    if (cols.precoVendaUnitario) tableRows += `<td style="text-align:right"><strong>R$ ${calc.precoVistaUnitario.toFixed(2)}</strong></td>`;
    if (cols.totalCusto) tableRows += `<td style="background:#FFF8E7;text-align:right"><strong>R$ ${calc.totalCustoReal.toFixed(2)}</strong></td>`;
    if (cols.totalVenda) tableRows += `<td style="background:#E8F5E9;text-align:right"><strong>R$ ${calc.totalPrecoVista.toFixed(2)}</strong></td>`;
    if (cols.observacoes) tableRows += `<td>${product.observacoes || ''}</td>`;
    tableRows += '</tr>';
  });

  // Linha de totais
  let totalsRow = '<tr class="totals">';
  let colspanCount = 0;
  if (cols.numero) colspanCount++;
  if (cols.quantidade) colspanCount++;
  if (cols.descricao) colspanCount++;
  if (cols.fornecedor) colspanCount++;
  
  if (colspanCount > 0) {
    totalsRow += `<td colspan="${colspanCount}"><strong>${config.t ? config.t.grandTotalsLabel : 'TOTAIS GERAIS:'}</strong></td>`;
  }
  
  if (cols.precoUnitario) totalsRow += `<td><strong>R$ ${totals.totalPrecoOriginal.toFixed(2)}</strong></td>`;
  if (cols.ipi) totalsRow += `<td><strong>R$ ${totals.totalIPI.toFixed(2)}</strong></td>`;
  if (cols.frete) totalsRow += `<td><strong>R$ ${totals.totalFrete.toFixed(2)}</strong></td>`;
  if (cols.custoRealUnitario) totalsRow += `<td></td>`;
  if (cols.precoVendaUnitario) totalsRow += `<td></td>`;
  if (cols.totalCusto) totalsRow += `<td><strong>R$ ${totals.totalCustoReal.toFixed(2)}</strong></td>`;
  if (cols.totalVenda) totalsRow += `<td><strong>R$ ${totals.totalPrecoVista.toFixed(2)}</strong></td>`;
  if (cols.observacoes) totalsRow += `<td></td>`;
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
              IPI: ${config.ipi}% | Frete: ${config.frete}% ${config.freteEmbutido ? (config.t ? config.t.embedded_short : '(Embutido)') : (config.t ? config.t.notEmbedded_short : '(N\u00e3o Embutido)')} | ${config.t ? config.t.marginLabel.replace(' (%)', '') : 'Margem'}: +${config.margem}% / -${(config.margem / (100 + config.margem) * 100).toFixed(2)}%
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