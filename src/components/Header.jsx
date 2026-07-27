import React from 'react';
import { Moon, Sun, Building2 } from 'lucide-react';
import Button from './ui/Button';
import { TextInput } from './ui/Field';
import { cx, textClasses } from './ui/themeClasses';

export default function Header({ darkMode, onToggleDarkMode, empresa, onEmpresaChange, lang, onToggleLang, t }) {
  const text = textClasses(darkMode);
  const companyInputClass = darkMode
    ? 'border-[#454c58] bg-[#191c22] text-[#f5f7fa] placeholder:text-[#7d8594] backdrop-blur-none'
    : 'border-[#cbd2da] bg-white text-[#111827] placeholder:text-[#9aa3b3] backdrop-blur-none';

  return (
    <header className="topbar mb-3 flex w-full min-w-0 items-start justify-between gap-3 sm:min-h-[58px] sm:items-center sm:gap-5">
      <div className="brand-area flex min-w-0 flex-1 flex-col gap-3 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-5">
        <div className="brand-copy min-w-0">
          <h1 className={cx('text-[1.42rem] font-extrabold leading-[1.2] sm:text-[2rem] sm:leading-[2.2rem] min-[900px]:whitespace-nowrap', text.title)}>
            {t.appTitle}
          </h1>
          <p className={cx('mt-1 text-[0.72rem] leading-[1.125rem] sm:text-[0.84rem]', text.muted)}>
            {t.appSubtitle}
          </p>
        </div>

        <div className="company-field flex w-full max-w-[340px] min-w-0 flex-col min-[480px]:max-w-[220px] min-[900px]:w-[220px] min-[900px]:flex-none">
          <label className={cx('mb-1 flex min-h-[17px] items-center gap-1.5 text-xs font-semibold leading-[17px]', text.body)}>
            <Building2 size={15} className="opacity-80" />
            {t.companyLabel}
          </label>
          <TextInput
            darkMode={darkMode}
            type="text"
            value={empresa}
            onChange={(e) => onEmpresaChange(e.target.value)}
            placeholder={t.companyPlaceholder}
            autoComplete="organization"
            size="header"
            className={companyInputClass}
          />
        </div>
      </div>

      <div className="header-actions flex flex-shrink-0 items-center gap-1.5 self-start sm:self-center">
        <Button
          darkMode={darkMode}
          variant="topbar"
          size="topbarLang"
          onClick={onToggleLang}
          title={lang === 'pt' ? 'Switch to English' : 'Mudar para Portugu\u00eas'}
          className="overflow-hidden"
        >
          <img
            src={lang === 'pt' ? 'https://flagcdn.com/w40/us.png' : 'https://flagcdn.com/w40/br.png'}
            alt={lang === 'pt' ? 'English' : 'Portugu\u00eas'}
            className="block h-auto w-6 rounded"
          />
        </Button>
        <Button
          darkMode={darkMode}
          variant="topbar"
          size="topbarIcon"
          onClick={onToggleDarkMode}
          aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
    </header>
  );
}
