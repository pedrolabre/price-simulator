import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Button from './ui/Button';
import ModalShell from './ui/ModalShell';
import { cx, textClasses } from './ui/themeClasses';

const columns = [
  { key: 'numero' },
  { key: 'quantidade' },
  { key: 'descricao' },
  { key: 'fornecedor' },
  { key: 'precoUnitario' },
  { key: 'ipi' },
  { key: 'frete' },
  { key: 'custoRealUnitario' },
  { key: 'precoVendaUnitario' },
  { key: 'totalCusto' },
  { key: 'totalVenda' },
  { key: 'observacoes' }
];

const defaultSelectedColumns = columns.reduce((acc, column) => {
  acc[column.key] = true;
  return acc;
}, {});

function getTranslationType(exportType) {
  return exportType === 'xls' ? 'csv' : exportType;
}

export default function ExportModal({
  isOpen,
  onClose,
  onExport,
  exportType,
  darkMode,
  t
}) {
  const [selectedColumns, setSelectedColumns] = useState(defaultSelectedColumns);
  const selectedCount = Object.values(selectedColumns).filter(Boolean).length;
  const noColumnsSelected = selectedCount === 0;
  const text = textClasses(darkMode);
  const translationType = getTranslationType(exportType);

  const toggleColumn = (key) => {
    setSelectedColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => {
    setSelectedColumns(defaultSelectedColumns);
  };

  const deselectAll = () => {
    setSelectedColumns(columns.reduce((acc, column) => {
      acc[column.key] = false;
      return acc;
    }, {}));
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
      subtitle={t.chooseColumns(translationType)}
      closeLabel={t.cancel}
      footer={(
        <>
          <Button darkMode={darkMode} variant="secondary" size="modal" onClick={onClose} className="w-full sm:w-auto">
            {t.cancel}
          </Button>
          <Button
            darkMode={darkMode}
            variant="primary"
            size="modal"
            onClick={handleExport}
            disabled={noColumnsSelected}
            className="w-full sm:w-auto"
          >
            {t.exportBtn(translationType)}
          </Button>
        </>
      )}
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Button darkMode={darkMode} variant="secondary" size="modal" onClick={selectAll} className="w-full">
          {t.selectAll}
        </Button>
        <Button darkMode={darkMode} variant="secondary" size="modal" onClick={deselectAll} className="w-full">
          {t.deselectAll}
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {columns.map(column => {
          const checked = selectedColumns[column.key];

          return (
            <label
              key={column.key}
              className={cx(
                'flex min-h-[52px] cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 transition hover:-translate-y-px',
                checked
                  ? darkMode
                    ? 'border-[#cf1026] bg-[#35171b]'
                    : 'border-[#cf1026] bg-[#fff0f1]'
                  : darkMode
                    ? 'border-white/10 bg-[#171b22] hover:border-white/20 hover:bg-[#202631]'
                    : 'border-[#e2e6ec] bg-white hover:border-[#cfd5df] hover:bg-[#f8f9fb]'
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
                  'grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-md border transition',
                  checked
                    ? 'border-[#cf1026] bg-[#cf1026] text-white'
                    : darkMode
                      ? 'border-white/20 bg-[#202631] text-transparent'
                      : 'border-[#cfd5df] bg-[#f8f9fb] text-transparent'
                )}
              >
                <Check size={14} />
              </span>
              <span className={cx('min-w-0 text-sm font-semibold leading-snug', checked ? text.main : text.body)}>
                {t.columnLabels[column.key]}
              </span>
            </label>
          );
        })}
      </div>

      <div className={cx('mt-4 rounded-md border px-3 py-2 text-center text-sm', darkMode ? 'border-white/10 bg-[#202631]' : 'border-[#e2e6ec] bg-[#f8f9fb]', noColumnsSelected ? 'text-[#cf1026]' : text.softMuted)}>
        {t.colsSelected(selectedCount, columns.length)}
      </div>
    </ModalShell>
  );
}
