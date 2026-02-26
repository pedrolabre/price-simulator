import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

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

  if (!isOpen) return null;

  const overlayBg = darkMode ? 'bg-black/70' : 'bg-black/50';
  const modalBg = darkMode 
    ? 'bg-gray-900 border border-white/10' 
    : 'bg-white border border-gray-200';
  const textMain = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  const checkboxBg = darkMode ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-300';

  return (
    <div className={`fixed inset-0 ${overlayBg} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${modalBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto`}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#C8102E] to-[#E31837] text-white p-6 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">{t.selectColumns}</h2>
            <p className="text-sm text-red-100 mt-1">
              {t.chooseColumns(exportType)}
            </p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Botões de Ação Rápida */}
          <div className="flex gap-3 mb-6">
            <button onClick={selectAll} className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition">
              {t.selectAll}
            </button>
            <button onClick={deselectAll} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition">
              {t.deselectAll}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {columns.map(column => (
              <label
                key={column.key}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
                  darkMode 
                    ? 'hover:bg-white/5 border border-white/10' 
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="relative">
                  <input type="checkbox" checked={selectedColumns[column.key]} onChange={() => toggleColumn(column.key)} className="sr-only" />
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                    selectedColumns[column.key] ? 'bg-[#C8102E] border-[#C8102E]' : checkboxBg
                  }`}>
                    {selectedColumns[column.key] && <Check size={16} className="text-white" />}
                  </div>
                </div>
                <span className={`font-medium ${textMain}`}>{t.columnLabels[column.key]}</span>
              </label>
            ))}
          </div>

          <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
            <p className={`text-center ${textMuted}`}>
              {t.colsSelected(Object.values(selectedColumns).filter(Boolean).length, columns.length)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-800 p-6 flex gap-3">
          <button onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition">
            {t.cancel}
          </button>
          <button
            onClick={handleExport}
            disabled={Object.values(selectedColumns).every(v => !v)}
            className="flex-1 bg-gradient-to-r from-[#C8102E] to-[#E31837] hover:from-[#E31837] hover:to-[#C8102E] text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.exportBtn(exportType)}
          </button>
        </div>
      </div>
    </div>
  );
}