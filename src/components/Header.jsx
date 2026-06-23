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
    <div className="flex w-full min-w-0 flex-col gap-4 mb-6 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="w-full min-w-0 flex-1">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:gap-4 sm:flex-wrap">
          <div className="min-w-0">
            <h1 className={`text-3xl sm:text-4xl leading-tight font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {t.appTitle}
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              {t.appSubtitle}
            </p>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-1 pb-0.5 sm:w-auto">
            <label className={`text-xs font-medium flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Building2 size={12} />
              {t.companyLabel}
            </label>
            <input
              type="text"
              value={empresa}
              onChange={(e) => onEmpresaChange(e.target.value)}
              placeholder={t.companyPlaceholder}
              className={`w-full min-w-0 border rounded-xl px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition sm:min-w-[220px] ${inputBg}`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2 self-start sm:mt-1 sm:self-auto">
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
