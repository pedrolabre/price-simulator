import React from 'react';
import { Download, FileText, Eye, Trash2, Globe } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { cx, operationalCardClasses, textClasses } from './ui/themeClasses';

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
    <Card
      darkMode={darkMode}
      className={cx('mb-4 p-2.5 sm:p-3', operationalCardClasses(darkMode, { accent: 'left' }))}
    >
      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 min-w-10 flex-shrink-0 place-items-center rounded bg-[#cf1026] px-2.5 text-sm font-bold text-white">
            {productCount}
          </div>
          <div className="min-w-0">
            <div className={cx('text-[0.62rem] font-bold uppercase tracking-wider', text.muted)}>
              {t.totalProducts}
            </div>
            <div className={cx('mt-0.5 truncate text-sm font-semibold', text.main)}>
              {t.itemsRegistered(productCount)}
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-1.5 min-[520px]:grid-cols-3 md:flex md:w-auto md:flex-wrap md:justify-end">
          <Button darkMode={darkMode} variant="actionClear" size="summaryAction" onClick={handleClearClick} className="w-full md:w-auto">
            <Trash2 size={14} className="flex-shrink-0" /> {t.clear}
          </Button>
          <Button darkMode={darkMode} variant="actionPreview" size="summaryAction" onClick={onPreview} className="w-full md:w-auto">
            <Eye size={14} className="flex-shrink-0" /> {t.preview}
          </Button>
          <Button darkMode={darkMode} variant="actionExcel" size="summaryAction" onClick={onExportXLS} className="w-full md:w-auto">
            <Download size={14} className="flex-shrink-0" /> Excel
          </Button>
          <Button darkMode={darkMode} variant="actionHtml" size="summaryAction" onClick={onExportHTML} className="w-full md:w-auto">
            <Globe size={14} className="flex-shrink-0" /> HTML
          </Button>
          <Button darkMode={darkMode} variant="actionPdf" size="summaryAction" onClick={onExportPDF} className="w-full md:w-auto">
            <FileText size={14} className="flex-shrink-0" /> PDF
          </Button>
        </div>
      </div>
    </Card>
  );
}
