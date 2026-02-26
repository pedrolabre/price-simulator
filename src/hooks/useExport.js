import { generateHTML } from '../utils/htmlGenerator';
import { generateXLS } from '../utils/xlsGenerator';
import { generatePDF } from '../utils/pdfGenerator';

export function useExport() {
  const exportHTML = (products, calculations, config, selectedColumns) => {
    const html = generateHTML(products, calculations, config, selectedColumns);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulacao_precos_${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportXLS = (products, calculations, config, selectedColumns) => {
    const xls = generateXLS(products, calculations, config, selectedColumns);
    const blob = new Blob([xls], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulacao_precos_${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportPDF = (products, calculations, totals, config, selectedColumns) => {
    generatePDF(products, calculations, totals, config, selectedColumns);
  };

  return { exportXLS, exportHTML, exportPDF };
}