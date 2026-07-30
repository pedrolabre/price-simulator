import React from 'react';
import { Moon, Sun } from 'lucide-react';
import Button from './ui/Button';
import { TextInput } from './ui/Field';
import { cx, textClasses } from './ui/themeClasses';

export default function Header({ darkMode, onToggleDarkMode, empresa, onEmpresaChange, lang, onToggleLang, t }) {
  const text = textClasses(darkMode);
  const companyInputClass = darkMode
    ? '!rounded-none border-[#454c58] bg-[#191c22] text-[#f5f7fa] placeholder:text-[#7d8594]'
    : '!rounded-none border-[#cbd2da] bg-white text-[#111827] placeholder:text-[#9aa3b3]';

  return (
    <header className="mb-3 flex min-h-[58px] w-full min-w-0 items-center justify-between gap-3 min-[760px]:gap-[18px]">
      <div className="flex min-w-0 flex-1 flex-col gap-3 min-[760px]:flex-row min-[760px]:items-center min-[760px]:gap-[18px]">
        <div className="min-w-0 max-w-full flex-none">
          <h1 className={cx('m-0 max-w-full whitespace-normal text-[24px] font-[820] leading-[29px] tracking-normal min-[380px]:whitespace-nowrap min-[760px]:min-h-[34px] min-[760px]:text-[30px] min-[760px]:leading-[34px]', text.title)}>
            {t.appTitle}
          </h1>
          <p className={cx('mt-1 min-h-[18px] text-[13.44px] leading-[18px]', text.muted)}>
            {t.appSubtitle}
          </p>
        </div>

        <div className="flex w-full max-w-[340px] min-w-0 flex-col min-[480px]:max-w-[220px] min-[760px]:w-[220px] min-[760px]:flex-none">
          <label className={cx('mb-1 min-h-[17px] text-xs font-semibold leading-[17px]', text.body)} htmlFor="companyName">
            {t.companyLabel}
          </label>
          <TextInput
            id="companyName"
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

      <div className="flex flex-shrink-0 items-center gap-1.5 self-start min-[760px]:self-center" aria-label="Acoes de interface">
        <Button
          darkMode={darkMode}
          variant="topbar"
          size="topbarLang"
          onClick={onToggleLang}
          title={lang === 'pt' ? 'Switch to English' : 'Mudar para Portugues'}
        >
          {lang === 'pt' ? 'US' : 'BR'}
        </Button>
        <Button
          darkMode={darkMode}
          variant="topbar"
          size="topbarIcon"
          onClick={onToggleDarkMode}
          aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </Button>
      </div>
    </header>
  );
}
