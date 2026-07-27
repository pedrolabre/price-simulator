import React from 'react';
import { Building2 } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import Field, { TextInput } from './ui/Field';
import { cx, freightNoticeClasses, textClasses } from './ui/themeClasses';

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

  return (
    <Card darkMode={darkMode} className="p-4 mb-6 sm:p-6">
      <h2 className={cx('text-lg font-semibold mb-5', text.body)}>
        {t.configTitle}
      </h2>

      <Field darkMode={darkMode} label={t.defaultSupplier} icon={Building2} className="mb-5">
        <TextInput
          darkMode={darkMode}
          type="text"
          value={fornecedorPadrao}
          onChange={(e) => onFornecedorChange(e.target.value)}
          placeholder={t.supplierPlaceholder}
        />
      </Field>

      {frete > 0 && (
        <div className={cx('mb-5 p-4 rounded-xl border-2 backdrop-blur-sm', freightNoticeClasses(darkMode))}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h3 className={cx('font-semibold mb-1', text.body)}>{t.freightMode}</h3>
              <p className={cx('text-sm', text.muted)}>
                {freteEmbutido ? t.freightEmbedded : t.freightNotEmbedded}
              </p>
            </div>
            <Button
              darkMode={darkMode}
              variant={freteEmbutido ? 'solidSuccess' : 'solidDanger'}
              size="md"
              onClick={onToggleFrete}
              className="w-full sm:w-auto"
            >
              {freteEmbutido ? t.embedded : t.notEmbedded}
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field darkMode={darkMode} label={t.ipiLabel}>
          <TextInput
            darkMode={darkMode}
            type="number"
            step="0.01"
            value={ipi}
            onChange={(e) => onIPIChange(parseFloat(e.target.value) || 0)}
          />
        </Field>
        <Field darkMode={darkMode} label={t.freightLabel}>
          <TextInput
            darkMode={darkMode}
            type="number"
            step="0.01"
            value={frete}
            onChange={(e) => onFreteChange(parseFloat(e.target.value) || 0)}
            focus="amber"
          />
        </Field>
        <Field darkMode={darkMode} label={t.marginLabel}>
          <TextInput
            darkMode={darkMode}
            type="number"
            step="0.01"
            value={margem}
            onChange={(e) => onMargemChange(parseFloat(e.target.value) || 0)}
            focus="green"
          />
          {margem > 0 && (
            <p className={cx('text-xs mt-1.5', text.muted)}>
              <span className={darkMode ? 'text-green-400 font-semibold' : 'text-green-600 font-semibold'}>+{margem}%</span>
              {' '}{t.marginHintAdd}{' \u2192 '}
              <span className={darkMode ? 'text-red-400 font-semibold' : 'text-red-600 font-semibold'}>-{(margem / (100 + margem) * 100).toFixed(2)}%</span>
              {' '}{t.marginHintRevert}
            </p>
          )}
        </Field>
      </div>
    </Card>
  );
}
