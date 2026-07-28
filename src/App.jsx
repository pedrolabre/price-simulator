import React, { useState } from 'react';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import ImportSection from './components/ImportSection';
import ConfigPanel from './components/ConfigPanel';
import ProductTable from './components/ProductTable';
import PreviewModal from './components/PreviewModal';
import ExportModal from './components/ExportModal';
import ConfirmModal from './components/ConfirmModal';
import { useProducts } from './hooks/useProducts';
import { useCalculations } from './hooks/useCalculations';
import { useParser } from './hooks/useParser';
import { useExport } from './hooks/useExport';
import { DEFAULT_CONFIG } from './constants/defaults';
import { translations } from './constants/translations';
import { appContentClasses, appShellClasses } from './components/ui/themeClasses';

export default function App() {
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
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportType, setExportType] = useState(null); // 'xls', 'html' or 'pdf'
  const [empresa, setEmpresa] = useState('');

  const { products, addProducts, updateProduct, deleteProduct, addEmptyRow, clearProducts } = useProducts();
  const { parse } = useParser();
  const { exportXLS, exportHTML, exportPDF } = useExport();

  const config = { ipi, frete, margem, freteEmbutido, empresa, t };
  const { calculations, totals } = useCalculations(products, config);

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

  const handleConfirmClear = () => {
    clearProducts();
  };

  return (
    <div className={appShellClasses(darkMode)}>
      <main className={appContentClasses()}>
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
            onClear={() => setShowClearConfirm(true)}
            t={t}
          />
        )}

        <div className="mb-6 grid w-full min-w-0 gap-4 lg:grid-cols-2 lg:items-stretch">
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
        </div>

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
        <ConfirmModal
          isOpen={showClearConfirm}
          onClose={() => setShowClearConfirm(false)}
          onConfirm={handleConfirmClear}
          productCount={products.length}
          darkMode={darkMode}
          t={t}
        />
      </main>
    </div>
  );
}
