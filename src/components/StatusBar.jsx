import React from 'react';
import { Download, FileText, Eye, Trash2, Globe } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { cx, textClasses } from './ui/themeClasses';

export default function StatusBar({
  productCount,
  darkMode,
  onExportXLS,
  onExportHTML,
  onExportPDF,
  onPreview,
  onClear,
  t
}) {
  const text = textClasses(darkMode);

  const handleClearClick = () => {
    if (window.confirm(t.confirmClear(productCount))) {
      onClear();
    }
  };

  return (
    <Card darkMode={darkMode} className="p-4 mb-6 sm:p-5">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg">
            {productCount}
          </div>
          <div className="min-w-0">
            <div className={cx('text-xs uppercase tracking-wide', text.muted)}>
              {t.totalProducts}
            </div>
            <div className={cx('font-semibold', text.body)}>
              {t.itemsRegistered(productCount)}
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
          <Button darkMode={darkMode} variant="subtleOrange" size="action" onClick={handleClearClick}>
            <Trash2 size={18} className="flex-shrink-0" /> {t.clear}
          </Button>
          <Button darkMode={darkMode} variant="subtleBlue" size="action" onClick={onPreview}>
            <Eye size={18} className="flex-shrink-0" /> {t.preview}
          </Button>
          <Button darkMode={darkMode} variant="subtleGreen" size="action" onClick={onExportXLS}>
            <Download size={18} className="flex-shrink-0" /> Excel
          </Button>
          <Button darkMode={darkMode} variant="subtleTeal" size="action" onClick={onExportHTML}>
            <Globe size={18} className="flex-shrink-0" /> HTML
          </Button>
          <Button darkMode={darkMode} variant="subtleRed" size="action" onClick={onExportPDF}>
            <FileText size={18} className="flex-shrink-0" /> PDF
          </Button>
        </div>
      </div>
    </Card>
  );
}
