import React from 'react';
import { Moon, Sun, Building2 } from 'lucide-react';

export default function Header({ darkMode, onToggleDarkMode, empresa, onEmpresaChange, lang, onToggleLang, t }) {
  const inputBg = darkMode
    ? 'bg-white/10 border-white/20 text-white placeholder-white/40'
    : 'bg-white/60 border-gray-300/60 text-gray-700 placeholder-gray-400';

  const btnBase = darkMode
    ? 'bg-white/10 hover:bg-white/20'
    : 'bg-gray-900/80 hover:bg-gray-900';

  return (
    <div className="flex justify-between items-start mb-8 gap-6">
      <div className="flex-1">
        <div className="flex items-end gap-4 flex-wrap">
          <div>
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {t.appTitle}
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              {t.appSubtitle}
            </p>
          </div>
          <div className="flex flex-col gap-1 pb-0.5">
            <label className={`text-xs font-medium flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Building2 size={12} />
              {t.companyLabel}
            </label>
            <input
              type="text"
              value={empresa}
              onChange={(e) => onEmpresaChange(e.target.value)}
              placeholder={t.companyPlaceholder}
              className={`border rounded-xl px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition min-w-[220px] ${inputBg}`}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1 flex-shrink-0">
        <button
          onClick={onToggleLang}
          title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          className={`p-2 rounded-2xl backdrop-blur-lg transition-all shadow-lg overflow-hidden ${btnBase}`}
        >
          <img
            src={lang === 'pt' ? 'https://flagcdn.com/w40/us.png' : 'https://flagcdn.com/w40/br.png'}
            alt={lang === 'pt' ? 'English' : 'Português'}
            className="w-8 h-auto rounded-md block"
          />
        </button>
        <button
          onClick={onToggleDarkMode}
          className={`p-3 rounded-2xl backdrop-blur-lg transition-all shadow-lg ${
            darkMode 
              ? 'bg-white/10 hover:bg-white/20 text-amber-400' 
              : 'bg-gray-900/80 hover:bg-gray-900 text-white'
          }`}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </div>
    </div>
  );
}