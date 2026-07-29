import React from 'react';
import { Check } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { Textarea } from './ui/Field';
import { cx, operationalCardClasses, operationalInputClasses, textClasses } from './ui/themeClasses';

export default function ImportSection({
  textInput,
  onTextChange,
  onProcess,
  onUseExample,
  darkMode,
  t,
  compact = false,
  className = ''
}) {
  const text = textClasses(darkMode);

  return (
    <Card as="section" darkMode={darkMode} className={cx('h-full min-w-0', operationalCardClasses(darkMode, { accent: 'top' }), className)}>
      <div className={cx('flex h-full flex-col px-4', compact ? 'py-2' : 'py-[12px]')}>
        <div className={cx('flex min-w-0 flex-col gap-1 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between min-[640px]:gap-4', compact ? 'mb-1' : 'mb-1.5')}>
          <h2 className={cx('flex-shrink-0 text-[0.9rem] font-bold leading-[1.18]', text.main)}>
            {t.importTitle}
          </h2>
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3 min-[640px]:justify-end">
            <p className={cx('min-w-0 truncate text-[0.72rem] leading-[1.25]', text.muted)} title={t.importHint}>
              {t.importHint}
            </p>
            <button
              type="button"
              onClick={onUseExample}
              className="flex-shrink-0 text-[0.75rem] font-bold leading-4 text-[#cf1026] transition hover:text-[#ad0b1d]"
            >
              {t.useExample || 'Usar exemplo'}
            </button>
          </div>
        </div>

        <Textarea
          darkMode={darkMode}
          className={cx(
            'flex-1 resize-y font-sans text-[0.8rem] leading-[1.45]',
            compact ? 'h-[60px] min-h-[60px] !py-2' : 'h-[104px] min-h-[104px]',
            operationalInputClasses(darkMode)
          )}
          rows="5"
          placeholder={t.importPlaceholder}
          value={textInput}
          onChange={(e) => onTextChange(e.target.value)}
        />

        <div className={cx('flex flex-col gap-[10px] min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between', compact ? 'mt-1.5' : 'mt-2')}>
          <Button
            darkMode={darkMode}
            variant="flatPrimary"
            size="primaryCompact"
            onClick={onProcess}
            className="w-full min-[420px]:w-auto"
          >
            <Check size={14} className="flex-shrink-0" /> {t.processBtn}
          </Button>
          <span className={cx('text-[0.7rem] leading-4', text.muted)}>
            {t.formatHint || 'Aceita virgula, ponto e virgula ou tabulacao como separador.'}
          </span>
        </div>
      </div>
    </Card>
  );
}
