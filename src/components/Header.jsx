import React from 'react';
import { Moon, Sun, Building2 } from 'lucide-react';
import Button from './ui/Button';
import { TextInput } from './ui/Field';
import { cx, textClasses } from './ui/themeClasses';

export default function Header({ darkMode, onToggleDarkMode, empresa, onEmpresaChange, lang, onToggleLang, t }) {
  const text = textClasses(darkMode);

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 mb-6 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="w-full min-w-0 flex-1">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:gap-4 sm:flex-wrap">
          <div className="min-w-0">
            <h1 className={cx('text-3xl sm:text-4xl leading-tight font-bold mb-2', text.title)}>
              {t.appTitle}
            </h1>
            <p className={cx('text-sm', text.muted)}>
              {t.appSubtitle}
            </p>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-1 pb-0.5 sm:w-auto">
            <label className={cx('text-xs font-medium flex items-center gap-1.5', text.muted)}>
              <Building2 size={12} />
              {t.companyLabel}
            </label>
            <TextInput
              darkMode={darkMode}
              type="text"
              value={empresa}
              onChange={(e) => onEmpresaChange(e.target.value)}
              placeholder={t.companyPlaceholder}
              size="header"
              className="sm:min-w-[220px]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2 self-start sm:mt-1 sm:self-auto">
        <Button
          darkMode={darkMode}
          variant="header"
          size="iconLang"
          onClick={onToggleLang}
          title={lang === 'pt' ? 'Switch to English' : 'Mudar para Portugu\u00eas'}
          className="overflow-hidden"
        >
          <img
            src={lang === 'pt' ? 'https://flagcdn.com/w40/us.png' : 'https://flagcdn.com/w40/br.png'}
            alt={lang === 'pt' ? 'English' : 'Portugu\u00eas'}
            className="w-8 h-auto rounded-md block"
          />
        </Button>
        <Button
          darkMode={darkMode}
          variant="header"
          size="icon"
          onClick={onToggleDarkMode}
          className={darkMode ? 'text-amber-400' : 'text-white'}
          aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </Button>
      </div>
    </div>
  );
}
