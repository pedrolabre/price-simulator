import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import Button from './ui/Button';
import ModalShell from './ui/ModalShell';
import {
  cx,
  modalFooterClasses,
  modalHeaderClasses,
  textClasses
} from './ui/themeClasses';

export default function ExportModal({
  isOpen,
  onClose,
  onExport,
  exportType,
  darkMode,
  t
}) {
  const [selectedColumns, setSelectedColumns] = useState({
    numero: true,
    quantidade: true,
    descricao: true,
    fornecedor: true,
    observacoes: true,
    precoUnitario: true,
    ipi: true,
    frete: true,
    custoRealUnitario: true,
    precoVendaUnitario: true,
    totalCusto: true,
    totalVenda: true
  });

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

  const toggleColumn = (key) => {
    setSelectedColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => {
    const allSelected = {};
    columns.forEach(col => allSelected[col.key] = true);
    setSelectedColumns(allSelected);
  };

  const deselectAll = () => {
    const noneSelected = {};
    columns.forEach(col => noneSelected[col.key] = false);
    setSelectedColumns(noneSelected);
  };

  const handleExport = () => {
    try {
      onExport(selectedColumns);
    } catch (err) {
      console.error('Erro ao exportar:', err);
    } finally {
      onClose();
    }
  };

  const text = textClasses(darkMode);
  const checkboxBg = darkMode ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-300';

  return (
    <ModalShell isOpen={isOpen} darkMode={darkMode}>
      <div className={cx('sticky top-0 p-6 flex justify-between items-center rounded-t-2xl', modalHeaderClasses())}>
        <div>
          <h2 className="text-2xl font-bold">{t.selectColumns}</h2>
          <p className="text-sm text-red-100 mt-1">
            {t.chooseColumns(exportType)}
          </p>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition" type="button">
          <X size={24} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex gap-3 mb-6">
          <Button darkMode={darkMode} variant="solidSuccess" size="sm" fullWidth onClick={selectAll}>
            {t.selectAll}
          </Button>
          <Button darkMode={darkMode} variant="neutral" size="sm" fullWidth onClick={deselectAll}>
            {t.deselectAll}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {columns.map(column => (
            <label
              key={column.key}
              className={cx(
                'flex items-center gap-3 p-4 rounded-xl cursor-pointer transition',
                darkMode
                  ? 'hover:bg-white/5 border border-white/10'
                  : 'hover:bg-gray-50 border border-gray-200'
              )}
            >
              <div className="relative">
                <input type="checkbox" checked={selectedColumns[column.key]} onChange={() => toggleColumn(column.key)} className="sr-only" />
                <div className={cx(
                  'w-6 h-6 rounded-md border-2 flex items-center justify-center transition',
                  selectedColumns[column.key] ? 'bg-[#C8102E] border-[#C8102E]' : checkboxBg
                )}>
                  {selectedColumns[column.key] && <Check size={16} className="text-white" />}
                </div>
              </div>
              <span className={cx('font-medium', text.main)}>{t.columnLabels[column.key]}</span>
            </label>
          ))}
        </div>

        <div className={cx('mt-6 p-4 rounded-xl', darkMode ? 'bg-white/5' : 'bg-gray-100')}>
          <p className={cx('text-center', text.softMuted)}>
            {t.colsSelected(Object.values(selectedColumns).filter(Boolean).length, columns.length)}
          </p>
        </div>
      </div>

      <div className={cx('sticky bottom-0 p-6 flex gap-3', modalFooterClasses(darkMode))}>
        <Button darkMode={darkMode} variant="neutral" size="lg" fullWidth onClick={onClose}>
          {t.cancel}
        </Button>
        <Button
          darkMode={darkMode}
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleExport}
          disabled={Object.values(selectedColumns).every(v => !v)}
        >
          {t.exportBtn(exportType)}
        </Button>
      </div>
    </ModalShell>
  );
}
