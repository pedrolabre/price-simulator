import React from 'react';
import { Building2 } from 'lucide-react';

export default function ConfigPanel({
  ipi,
  frete,
  margem,
  freteEmbutido,
  fornecedorPadrao,
  onIPIChange,
  onFreteChange,
  onMargemChange,
  onToggleFrete,
  onFornecedorChange,
  darkMode,
  t
}) {
  const cardBg = darkMode 
  ? 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl' 
  : 'bg-white/70 backdrop-blur-2xl border border-gray-300/30 shadow-2xl';

  const inputBg = darkMode 
  ? 'bg-white/10 text-white border-white/20 backdrop-blur-xl' 
  : 'bg-white/80 backdrop-blur-xl border-gray-300';

  const textColor = darkMode ? 'text-gray-200' : 'text-gray-700';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-500';

  const toggleBg = darkMode 
  ? 'bg-yellow-500/20 border-yellow-500/40 backdrop-blur-xl' 
  : 'bg-yellow-100/80 border-yellow-300/50 backdrop-blur-xl';

  return (
    <div className={`${cardBg} rounded-2xl shadow-xl p-6 mb-6`}>
      <h2 className={`text-lg font-semibold mb-5 ${textColor}`}>
        {t.configTitle}
      </h2>

      <div className="mb-5">
        <label className={`block text-sm font-medium ${textColor} mb-2 flex items-center gap-2`}>
          <Building2 size={16} />
          {t.defaultSupplier}
        </label>
        <input
          type="text"
          value={fornecedorPadrao}
          onChange={(e) => onFornecedorChange(e.target.value)}
          placeholder={t.supplierPlaceholder}
          className={`w-full border ${inputBg} rounded-xl p-3 focus:ring-2 focus:ring-red-500/50 transition backdrop-blur-sm`}
        />
      </div>

      {frete > 0 && (
        <div className={`mb-5 p-4 rounded-xl border-2 ${toggleBg} backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-semibold ${textColor} mb-1`}>{t.freightMode}</h3>
              <p className={`text-sm ${mutedColor}`}>
                {freteEmbutido ? t.freightEmbedded : t.freightNotEmbedded}
              </p>
            </div>
            <button
              onClick={onToggleFrete}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all shadow-md text-white ${
                freteEmbutido ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {freteEmbutido ? t.embedded : t.notEmbedded}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={`block text-sm font-medium ${textColor} mb-2`}>{t.ipiLabel}</label>
          <input type="number" step="0.01" value={ipi} onChange={(e) => onIPIChange(parseFloat(e.target.value) || 0)}
            className={`w-full border ${inputBg} rounded-xl p-3 focus:ring-2 focus:ring-red-500/50 transition backdrop-blur-sm`} />
        </div>
        <div>
          <label className={`block text-sm font-medium ${textColor} mb-2`}>{t.freightLabel}</label>
          <input type="number" step="0.01" value={frete} onChange={(e) => onFreteChange(parseFloat(e.target.value) || 0)}
            className={`w-full border ${inputBg} rounded-xl p-3 focus:ring-2 focus:ring-amber-500/50 transition backdrop-blur-sm`} />
        </div>
        <div>
          <label className={`block text-sm font-medium ${textColor} mb-2`}>{t.marginLabel}</label>
          <input type="number" step="0.01" value={margem} onChange={(e) => onMargemChange(parseFloat(e.target.value) || 0)}
            className={`w-full border ${inputBg} rounded-xl p-3 focus:ring-2 focus:ring-green-500/50 transition backdrop-blur-sm`} />
          {margem > 0 && (
            <p className={`text-xs mt-1.5 ${mutedColor}`}>
              <span className={darkMode ? 'text-green-400 font-semibold' : 'text-green-600 font-semibold'}>+{margem}%</span>
              {' '}{t.marginHintAdd}{' → '}
              <span className={darkMode ? 'text-red-400 font-semibold' : 'text-red-600 font-semibold'}>-{(margem / (100 + margem) * 100).toFixed(2)}%</span>
              {' '}{t.marginHintRevert}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}