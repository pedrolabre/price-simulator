import { generateHTML } from '../utils/htmlGenerator';
import { generateXLS } from '../utils/xlsGenerator';
import { generatePDF } from '../utils/pdfGenerator';

function downloadFile(content, type, filename) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => window.URL.revokeObjectURL(url), 0);
}

export function useExport() {
  const exportHTML = (products, calculations, config, selectedColumns) => {
    const html = generateHTML(products, calculations, config, selectedColumns);
    downloadFile(
      html,
      'text/html;charset=utf-8;',
      `simulacao_precos_${new Date().toISOString().split('T')[0]}.html`
    );
  };

  const exportXLS = (products, calculations, config, selectedColumns) => {
    const xls = generateXLS(products, calculations, config, selectedColumns);
    downloadFile(
      `\uFEFF${xls}`,
      'application/vnd.ms-excel;charset=utf-8;',
      `simulacao_precos_${new Date().toISOString().split('T')[0]}.xls`
    );
  };

  const exportPDF = (products, calculations, totals, config, selectedColumns) => {
    generatePDF(products, calculations, totals, config, selectedColumns);
  };

  return { exportXLS, exportHTML, exportPDF };
}
