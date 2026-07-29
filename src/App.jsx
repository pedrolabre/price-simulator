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
import { appContentClasses, appShellClasses, cx } from './components/ui/themeClasses';

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
  const [exportType, setExportType] = useState(null);
  const [empresa, setEmpresa] = useState('');

  const { products, addProducts, updateProduct, deleteProduct, addEmptyRow, clearProducts } = useProducts();
  const { parse } = useParser();
  const { exportXLS, exportHTML, exportPDF } = useExport();

  const config = { ipi, frete, margem, freteEmbutido, empresa, t };
  const { calculations, totals } = useCalculations(products, config);
  const hasProducts = products.length > 0;

  const handleProcessText = () => {
    const parsedProducts = parse(textInput, fornecedorPadrao);
    addProducts(parsedProducts);
    setTextInput('');
  };

  const handleUseExample = () => {
    setTextInput('PRODUTO,1,R$ 99.999.99');
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
    <div className={appShellClasses(darkMode, hasProducts)}>
      <main className={appContentClasses(hasProducts)}>
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          lang={lang}
          onToggleLang={() => setLang(l => l === 'pt' ? 'en' : 'pt')}
          empresa={empresa}
          onEmpresaChange={setEmpresa}
          t={t}
        />

        <div
          className={cx(
            'grid min-w-0 gap-[10px] min-[981px]:grid-cols-2',
            hasProducts
              ? 'min-[981px]:min-h-0 min-[981px]:flex-1 min-[981px]:grid-rows-[52px_auto_minmax(0,1fr)] min-[981px]:overflow-hidden'
              : 'min-[981px]:grid-rows-[52px_auto]'
          )}
        >
          <StatusBar
            productCount={products.length}
            darkMode={darkMode}
            onExportXLS={() => handleOpenExportModal('xls')}
            onExportHTML={() => handleOpenExportModal('html')}
            onExportPDF={() => handleOpenExportModal('pdf')}
            onPreview={() => setShowPreview(true)}
            onClear={() => setShowClearConfirm(true)}
            t={t}
            isEmpty={!hasProducts}
            className="min-[981px]:col-span-2"
          />

          <ImportSection
            textInput={textInput}
            onTextChange={setTextInput}
            onProcess={handleProcessText}
            onUseExample={handleUseExample}
            darkMode={darkMode}
            t={t}
            compact
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
            compact
          />

          {hasProducts && (
            <ProductTable
              products={products}
              calculations={calculations}
              totals={totals}
              onAddRow={handleAddRow}
              onUpdateProduct={updateProduct}
              onDeleteProduct={deleteProduct}
              darkMode={darkMode}
              t={t}
              className="min-[981px]:col-span-2 min-[981px]:min-h-0"
            />
          )}
        </div>

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
