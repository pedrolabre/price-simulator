import React from 'react';
import Card from './ui/Card';
import Field, { TextInput } from './ui/Field';
import { formatNumberInput, formatReverseMargin, parseNumberInput } from '../utils/formatters';
import { cx, operationalCardClasses, operationalInputClasses, textClasses } from './ui/themeClasses';

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
  t,
  compact = false,
  className = ''
}) {
  const text = textClasses(darkMode);
  const labelClassName = cx(compact ? '!mb-[3px]' : '!mb-1', 'min-h-[17px] text-xs font-semibold leading-[17px]', text.softMuted);
  const compactInputClass = compact ? '!h-8 !min-h-8' : '';

  return (
    <Card as="section" darkMode={darkMode} className={cx('h-full min-w-0', operationalCardClasses(darkMode), className)}>
      <div className={cx('flex h-full flex-col px-4', compact ? 'py-2.5' : 'py-[14px]')}>
        <div className={cx('min-w-0', compact ? 'mb-1.5' : 'mb-[5px]')}>
          <h2 className={cx('text-[0.9rem] font-bold leading-[1.25]', text.main)}>
            {t.configTitle}
          </h2>
        </div>

        <Field darkMode={darkMode} label={t.defaultSupplier} labelClassName={labelClassName}>
          <TextInput
            darkMode={darkMode}
            size="control"
            type="text"
            value={fornecedorPadrao}
            onChange={(e) => onFornecedorChange(e.target.value)}
            placeholder={t.supplierPlaceholder}
            className={operationalInputClasses(darkMode, compactInputClass)}
          />
        </Field>

        <div className={cx(
          'grid grid-cols-1 gap-x-3 min-[640px]:grid-cols-[minmax(0,0.74fr)_minmax(0,0.74fr)_minmax(0,1.52fr)]',
          compact ? 'mt-1 gap-y-1.5' : 'mt-2 gap-y-2'
        )}>
          <Field darkMode={darkMode} label={t.ipiLabel} labelClassName={labelClassName}>
            <TextInput
              darkMode={darkMode}
              size="control"
              type="text"
              inputMode="decimal"
              value={formatNumberInput(ipi)}
              onChange={(e) => onIPIChange(parseNumberInput(e.target.value))}
              className={operationalInputClasses(darkMode, compactInputClass)}
            />
          </Field>
          <Field darkMode={darkMode} label={t.freightLabel} labelClassName={labelClassName}>
            <TextInput
              darkMode={darkMode}
              size="control"
              type="text"
              inputMode="decimal"
              value={formatNumberInput(frete)}
              onChange={(e) => onFreteChange(parseNumberInput(e.target.value))}
              focus="amber"
              className={operationalInputClasses(darkMode, compactInputClass)}
            />
            <div className={cx(
              'mt-[3px] flex min-h-[16px] items-center gap-1.5 text-[0.68rem] leading-4',
              frete > 0 ? '' : 'invisible pointer-events-none select-none'
            )}>
              <label className={cx('inline-flex cursor-pointer items-center gap-1.5', text.body)}>
                <input
                  type="checkbox"
                  checked={freteEmbutido}
                  onChange={onToggleFrete}
                  className="h-3.5 w-3.5 accent-[#cf1026]"
                />
                <span>{freteEmbutido ? t.embedded : t.notEmbedded}</span>
              </label>
              <span className="group relative inline-flex">
                <button
                  type="button"
                  className={cx(
                    'grid h-4 w-4 place-items-center rounded-full border text-[0.62rem] font-bold leading-none',
                    darkMode ? 'border-white/20 text-[#d4d8df]' : 'border-[#aeb7c2] text-[#596273]'
                  )}
                  aria-label={t.freightMode}
                >
                  ?
                </button>
                <span className={cx(
                  'pointer-events-none absolute bottom-[calc(100%+6px)] left-0 z-20 w-[260px] max-w-[calc(100vw-32px)] rounded-[3px] border px-2 py-1.5 text-left text-[0.68rem] leading-4 opacity-0 shadow-none transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
                  darkMode ? 'border-white/10 bg-[#171b22] text-[#d4d8df]' : 'border-[#d8dee7] bg-white text-[#374151]'
                )}>
                  {freteEmbutido ? t.freightEmbedded : t.freightNotEmbedded}
                </span>
              </span>
            </div>
          </Field>
          <Field darkMode={darkMode} label={t.marginLabel} labelClassName={labelClassName}>
            <TextInput
              darkMode={darkMode}
              size="control"
              type="text"
              inputMode="decimal"
              value={formatNumberInput(margem)}
              onChange={(e) => onMargemChange(parseNumberInput(e.target.value))}
              focus="green"
              className={operationalInputClasses(darkMode, compactInputClass)}
            />
            {margem > 0 && (
              <p className={cx('mt-[3px] min-h-[14px] text-[0.66rem] leading-[1.25]', text.muted)}>
                <span className={darkMode ? 'font-bold text-green-400' : 'font-bold text-[#08a256]'}>+{margem}%</span>
                {' '}{t.marginHintAdd}{' \u2192 '}
                <span className={darkMode ? 'font-bold text-red-400' : 'font-bold text-[#cf1026]'}>-{formatReverseMargin(margem, { clampNonPositive: true })}%</span>
                {' '}{t.marginHintRevert}
              </p>
            )}
          </Field>
        </div>

      </div>
    </Card>
  );
}
