import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Button from './ui/Button';
import ModalShell from './ui/ModalShell';
import { REPORT_COLUMNS, createColumnSelection, getColumnLabel } from '../constants/columns';
import { cx, textClasses } from './ui/themeClasses';

export default function ExportModal({
  isOpen,
  onClose,
  onExport,
  exportType,
  darkMode,
  t
}) {
  const [selectedColumns, setSelectedColumns] = useState(createColumnSelection);
  const selectedCount = Object.values(selectedColumns).filter(Boolean).length;
  const noColumnsSelected = selectedCount === 0;
  const text = textClasses(darkMode);

  const toggleColumn = (key) => {
    setSelectedColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => {
    setSelectedColumns(createColumnSelection());
  };

  const deselectAll = () => {
    setSelectedColumns(createColumnSelection(false));
  };

  const handleExport = () => {
    if (noColumnsSelected) return;

    try {
      onExport(selectedColumns);
    } catch (err) {
      console.error('Erro ao exportar:', err);
    } finally {
      onClose();
    }
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      darkMode={darkMode}
      title={t.selectColumns}
      subtitle={t.chooseColumns(exportType)}
      maxWidth="max-w-[540px]"
      closeLabel={t.cancel}
      headerClassName="!px-3 !py-2.5"
      bodyClassName="!px-3 !py-3"
      footerClassName="!px-3 !py-2"
      footer={(
        <Button
          darkMode={darkMode}
          variant="primary"
          size="modal"
          onClick={handleExport}
          disabled={noColumnsSelected}
          className="w-full !h-8 sm:w-auto"
        >
          {t.exportBtn(exportType)}
        </Button>
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button darkMode={darkMode} variant="successOutline" size="modal" onClick={selectAll} className="w-full !h-8">
          {t.selectAll}
        </Button>
        <Button darkMode={darkMode} variant="secondary" size="modal" onClick={deselectAll} className="w-full !h-8">
          {t.deselectAll}
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {REPORT_COLUMNS.map(column => {
          const checked = selectedColumns[column.key];
          const optionClasses = darkMode
            ? 'border-white/10 bg-[#171b22] hover:border-white/20 hover:bg-[#202631]'
            : 'border-[#d8dee7] bg-white hover:border-[#cfd5df] hover:bg-[#f8f9fb]';

          return (
            <label
              key={column.key}
              className={cx(
                'flex min-h-[34px] cursor-pointer items-center gap-2 rounded-none border px-2.5 py-1.5 transition-colors',
                optionClasses
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleColumn(column.key)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cx(
                  'grid h-5 w-5 flex-shrink-0 place-items-center rounded-none border transition-colors',
                  checked
                    ? 'border-[#cf1026] bg-[#cf1026] text-white'
                    : darkMode
                      ? 'border-white/20 bg-[#202631] text-transparent'
                      : 'border-[#cfd5df] bg-[#f8f9fb] text-transparent'
                )}
              >
                <Check size={13} />
              </span>
              <span className={cx('min-w-0 text-[0.82rem] font-bold leading-snug', checked ? text.main : text.body)}>
                {getColumnLabel(t, column, 'selection')}
              </span>
            </label>
          );
        })}
      </div>
    </ModalShell>
  );
}
