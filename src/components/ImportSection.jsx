import React from 'react';

export default function ImportSection({ 
  textInput, 
  onTextChange, 
  onProcess, 
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

  return (
    <div className={`${cardBg} rounded-2xl shadow-xl p-6 mb-6`}>
      <h2 className={`text-lg font-semibold mb-3 ${textColor}`}>
        {t.importTitle}
      </h2>
      <p className={`text-sm ${mutedColor} mb-4`}>
        {t.importHint}
      </p>
      <textarea
        className={`w-full border ${inputBg} rounded-xl p-4 mb-4 font-mono text-sm focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition backdrop-blur-sm`}
        rows="6"
        placeholder={t.importPlaceholder}
        value={textInput}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <button
        onClick={onProcess}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
      >
        {t.processBtn}
      </button>
    </div>
  );
}