import React, { useState } from 'react';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import ImportSection from './components/ImportSection';
import ConfigPanel from './components/ConfigPanel';
import ProductTable from './components/ProductTable';
import PreviewModal from './components/PreviewModal';
import ExportModal from './components/ExportModal';
import { useProducts } from './hooks/useProducts';
import { useCalculations } from './hooks/useCalculations';
import { useParser } from './hooks/useParser';
import { useExport } from './hooks/useExport';
import { DEFAULT_CONFIG } from './constants/defaults';
import { translations } from './constants/translations';

export default function App() {
  // Estados principais
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('pt');
  const t = translations[lang];
  const [textInput, setTextInput] = useState('');
  const [ipi, setIpi] = useState(DEFAULT_CONFIG.ipi);
  const [frete, setFrete] = useState(DEFAULT_CONFIG.frete);
  const [margem, setMargem] = useState(DEFAULT_CONFIG.margem);
  const [freteEmbutido, setFreteEmbutido] = useState(DEFAULT_CONFIG.freteEmbutido);
  const [fornecedorPadrao, setFornecedorPadrao] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState(null); // 'csv' ou 'pdf'
  const [empresa, setEmpresa] = useState('');

  // Hooks customizados
  const { products, addProducts, updateProduct, deleteProduct, addEmptyRow, clearProducts } = useProducts();
  const { parse } = useParser();
  const { exportXLS, exportHTML, exportPDF } = useExport();

  // Configurações para cálculos
  const config = { ipi, frete, margem, freteEmbutido, empresa, t };
  const { calculations, totals } = useCalculations(products, config);

  // Handlers
  const handleProcessText = () => {
    const parsedProducts = parse(textInput, fornecedorPadrao);
    addProducts(parsedProducts);
    setTextInput('');
  };

  const handleOpenExportModal = (type) => {
    setExportType(type);
    setShowExportModal(true);
  };

  const handleExport = (selectedColumns) => {
    if (exportType === 'xls') {
      exportXLS(products, calculations, config, selectedColumns);
    } else if (exportType === 'html') {
      exportHTML(products, calculations, config, selectedColumns);
    } else if (exportType === 'pdf') {
      exportPDF(products, calculations, totals, config, selectedColumns);
    }
  };

  const handleAddRow = () => {
    addEmptyRow(fornecedorPadrao);
  };

  // Estilos do background
  const bgMain = darkMode 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200';

  return (
    <div className={`min-h-screen ${bgMain} p-8 transition-all duration-500`}>
      <div className="max-w-[1440px] mx-auto">
        <Header 
          darkMode={darkMode} 
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          lang={lang}
          onToggleLang={() => setLang(l => l === 'pt' ? 'en' : 'pt')}
          empresa={empresa}
          onEmpresaChange={setEmpresa}
          t={t}
        />

        {products.length > 0 && (
          <StatusBar
            productCount={products.length}
            darkMode={darkMode}
            onExportXLS={() => handleOpenExportModal('xls')}
            onExportHTML={() => handleOpenExportModal('html')}
            onExportPDF={() => handleOpenExportModal('pdf')}
            onPreview={() => setShowPreview(true)}
            onClear={clearProducts}
            t={t}
          />
        )}

        <ImportSection
          textInput={textInput}
          onTextChange={setTextInput}
          onProcess={handleProcessText}
          darkMode={darkMode}
          t={t}
        />

        <ConfigPanel
          ipi={ipi}
          frete={frete}
          margem={margem}
          freteEmbutido={freteEmbutido}
          fornecedorPadrao={fornecedorPadrao}
          onIPIChange={setIpi}
          onFreteChange={setFrete}
          onMargemChange={setMargem}
          onToggleFrete={() => setFreteEmbutido(!freteEmbutido)}
          onFornecedorChange={setFornecedorPadrao}
          darkMode={darkMode}
          t={t}
        />

        <ProductTable
          products={products}
          calculations={calculations}
          totals={totals}
          onAddRow={handleAddRow}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          darkMode={darkMode}
          t={t}
        />

        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          products={products}
          calculations={calculations}
          totals={totals}
          config={config}
          darkMode={darkMode}
          t={t}
        />
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          exportType={exportType}
          darkMode={darkMode}
          t={t}
        />
      </div>
    </div>
  );
}