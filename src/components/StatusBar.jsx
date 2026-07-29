import React from 'react';
import { Download, Eye, FileText, Globe, Trash2 } from 'lucide-react';
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
  t,
  isEmpty = false,
  className = ''
}) {
  const text = textClasses(darkMode);

  return (
    <Card
      darkMode={darkMode}
      aria-hidden={isEmpty}
      className={cx(
        'flex min-h-[52px] flex-col items-stretch justify-between gap-2 px-[10px] py-[7px] min-[640px]:h-[52px] min-[640px]:flex-row min-[640px]:items-center min-[640px]:gap-3',
        operationalCardClasses(darkMode, { accent: 'left' }),
        isEmpty && 'invisible pointer-events-none select-none',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-[9px]">
        <div className="grid h-[38px] min-w-[38px] flex-shrink-0 place-items-center rounded-[3px] bg-[#cf1026] px-[9px] text-[0.92rem] font-bold leading-none text-white">
          {productCount}
        </div>
        <div className="min-w-0">
          <div className={cx('text-[0.56rem] font-extrabold uppercase leading-[12px]', text.muted)}>
            {t.totalProducts}
          </div>
          <div className={cx('mt-px truncate text-[0.79rem] font-bold leading-[17px]', text.main)}>
            {t.itemsRegistered(productCount)}
          </div>
        </div>
      </div>

      <div className="grid w-full flex-shrink-0 grid-cols-2 gap-[5px] min-[390px]:grid-cols-3 min-[640px]:w-auto min-[640px]:flex min-[640px]:justify-end">
        <Button darkMode={darkMode} variant="actionClear" size="summaryAction" onClick={onClear} disabled={isEmpty} className="w-full md:w-auto">
          <Trash2 size={13} className="flex-shrink-0" /> {t.clear}
        </Button>
        <Button darkMode={darkMode} variant="actionPreview" size="summaryAction" onClick={onPreview} disabled={isEmpty} className="w-full md:w-auto">
          <Eye size={13} className="flex-shrink-0" /> {t.preview}
        </Button>
        <Button darkMode={darkMode} variant="actionExcel" size="summaryAction" onClick={onExportXLS} disabled={isEmpty} className="w-full md:w-auto">
          <Download size={13} className="flex-shrink-0" /> Excel
        </Button>
        <Button darkMode={darkMode} variant="actionHtml" size="summaryAction" onClick={onExportHTML} disabled={isEmpty} className="w-full md:w-auto">
          <Globe size={13} className="flex-shrink-0" /> HTML
        </Button>
        <Button darkMode={darkMode} variant="actionPdf" size="summaryAction" onClick={onExportPDF} disabled={isEmpty} className="w-full md:w-auto">
          <FileText size={13} className="flex-shrink-0" /> PDF
        </Button>
      </div>
    </Card>
  );
}
