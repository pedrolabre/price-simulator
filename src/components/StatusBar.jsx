import React from 'react';
import { Download, FileText, Eye, Trash2, Globe } from 'lucide-react';

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
  const cardBg = darkMode 
  ? 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl' 
  : 'bg-white/70 backdrop-blur-2xl border border-gray-300/30 shadow-2xl';

  const btnGreen = darkMode
    ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
    : 'bg-green-500/10 hover:bg-green-500/20 text-green-700';

  const btnRed = darkMode
    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
    : 'bg-red-500/10 hover:bg-red-500/20 text-red-700';

  const btnBlue = darkMode
    ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'
    : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-700';

  const btnTeal = darkMode
    ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300'
    : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-700';

  const btnOrange = darkMode
    ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300'
    : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-700';

  const handleClearClick = () => {
    if (window.confirm(t.confirmClear(productCount))) {
      onClear();
    }
  };

  return (
    <div className={`${cardBg} rounded-2xl shadow-xl p-5 mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg">
            {productCount}
          </div>
          <div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>
              {t.totalProducts}
            </div>
            <div className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} font-semibold`}>
              {t.itemsRegistered(productCount)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleClearClick} className={`${btnOrange} px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-medium backdrop-blur-sm`}>
            <Trash2 size={18} /> {t.clear}
          </button>
          <button onClick={onPreview} className={`${btnBlue} px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-medium backdrop-blur-sm`}>
            <Eye size={18} /> {t.preview}
          </button>
          <button onClick={onExportXLS} className={`${btnGreen} px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-medium backdrop-blur-sm`}>
            <Download size={18} /> Excel
          </button>
          <button onClick={onExportHTML} className={`${btnTeal} px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-medium backdrop-blur-sm`}>
            <Globe size={18} /> HTML
          </button>
          <button onClick={onExportPDF} className={`${btnRed} px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-medium backdrop-blur-sm`}>
            <FileText size={18} /> PDF
          </button>
        </div>
      </div>
    </div>
  );
}