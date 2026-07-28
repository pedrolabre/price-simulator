import React from 'react';
import { Building2, Percent, TrendingUp, Truck } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import Field, { TextInput } from './ui/Field';
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
  t
}) {
  const text = textClasses(darkMode);
  const compactLabel = cx('!mb-1 text-xs font-semibold', text.softMuted);

  return (
    <Card darkMode={darkMode} className={cx('h-full', operationalCardClasses(darkMode))}>
      <div className="flex h-full flex-col p-4 sm:p-[18px]">
        <div className="mb-3 min-w-0">
          <h2 className={cx('text-sm font-bold leading-5', text.main)}>
            {t.configTitle}
          </h2>
        </div>

        <Field darkMode={darkMode} label={t.defaultSupplier} icon={Building2} labelClassName={compactLabel}>
          <TextInput
            darkMode={darkMode}
            size="control"
            type="text"
            value={fornecedorPadrao}
            onChange={(e) => onFornecedorChange(e.target.value)}
            placeholder={t.supplierPlaceholder}
            className={operationalInputClasses(darkMode)}
          />
        </Field>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field darkMode={darkMode} label={t.ipiLabel} icon={Percent} labelClassName={compactLabel}>
            <TextInput
              darkMode={darkMode}
              size="control"
              type="number"
              step="0.01"
              value={ipi}
              onChange={(e) => onIPIChange(parseFloat(e.target.value) || 0)}
              className={operationalInputClasses(darkMode)}
            />
          </Field>
          <Field darkMode={darkMode} label={t.freightLabel} icon={Truck} labelClassName={compactLabel}>
            <TextInput
              darkMode={darkMode}
              size="control"
              type="number"
              step="0.01"
              value={frete}
              onChange={(e) => onFreteChange(parseFloat(e.target.value) || 0)}
              focus="amber"
              className={operationalInputClasses(darkMode)}
            />
          </Field>
          <Field darkMode={darkMode} label={t.marginLabel} icon={TrendingUp} labelClassName={compactLabel}>
            <TextInput
              darkMode={darkMode}
              size="control"
              type="number"
              step="0.01"
              value={margem}
              onChange={(e) => onMargemChange(parseFloat(e.target.value) || 0)}
              focus="green"
              className={operationalInputClasses(darkMode)}
            />
            {margem > 0 && (
              <p className={cx('mt-1 min-h-[16px] text-[0.68rem] leading-4', text.muted)}>
                <span className={darkMode ? 'text-green-400 font-semibold' : 'text-green-700 font-semibold'}>+{margem}%</span>
                {' '}{t.marginHintAdd}{' \u2192 '}
                <span className={darkMode ? 'text-red-400 font-semibold' : 'text-[#cf1026] font-semibold'}>-{(margem / (100 + margem) * 100).toFixed(2)}%</span>
                {' '}{t.marginHintRevert}
              </p>
            )}
          </Field>
        </div>

        {frete > 0 && (
          <div className={cx(
            'mt-3 rounded border p-3',
            darkMode ? 'border-amber-400/20 bg-amber-400/10' : 'border-[#ead28a] bg-[#fff8df]'
          )}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className={cx('text-xs font-bold leading-5', text.main)}>{t.freightMode}</h3>
                <p className={cx('text-xs leading-5', text.muted)}>
                  {freteEmbutido ? t.freightEmbedded : t.freightNotEmbedded}
                </p>
              </div>
              <Button
                darkMode={darkMode}
                variant={freteEmbutido ? 'freightOn' : 'freightOff'}
                size="toggle"
                onClick={onToggleFrete}
                className="w-full sm:w-auto"
              >
                {freteEmbutido ? t.embedded : t.notEmbedded}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
