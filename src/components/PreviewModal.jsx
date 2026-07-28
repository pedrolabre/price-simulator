import React from 'react';
import Button from './ui/Button';
import ModalShell from './ui/ModalShell';
import { REPORT_COLUMNS, countTotalsLabelColumns, getColumnLabel } from '../constants/columns';
import { getReportColumnValue, getReportTotalValue } from '../utils/exportRows';
import { formatMoney, formatReverseMargin } from '../utils/formatters';
import { cx, tableFooterCellClasses, textClasses } from './ui/themeClasses';

function previewHeaderCellClasses(darkMode, align = 'left') {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return cx(
    'sticky top-0 z-10 whitespace-nowrap border-b border-r px-2 py-2 align-middle text-[0.66rem] font-bold uppercase leading-tight last:border-r-0',
    darkMode
      ? 'border-white/10 bg-[#252b34] text-[#f5f7fa]'
      : 'border-[#d8dee7] bg-[#f1f3f6] text-[#111827]',
    alignClasses[align] || alignClasses.left
  );
}

function previewCellClasses(darkMode, { align = 'left', tone = 'default', strong = false } = {}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const tones = {
    default: darkMode ? 'bg-[#171b22] text-[#d4d8df]' : 'bg-white text-[#374151]',
    muted: darkMode ? 'bg-[#171b22] text-[#9ca3af]' : 'bg-white text-[#596273]',
    strong: darkMode ? 'bg-[#171b22] text-[#f5f7fa]' : 'bg-white text-[#111827]',
    sale: darkMode ? 'bg-[#171b22] text-[#46d27f]' : 'bg-white text-[#0f8a45]',
    costTotal: darkMode ? 'bg-[#292419] text-[#f4c95f]' : 'bg-[#fff2bd] text-[#8a5a00]',
    saleTotal: darkMode ? 'bg-[#17261e] text-[#4bd486]' : 'bg-[#e9f7ef] text-[#0f8a45]'
  };

  return cx(
    'border-b border-r px-2 py-2 align-top text-[0.74rem] last:border-r-0',
    darkMode ? 'border-white/10' : 'border-[#dfe3e8]',
    alignClasses[align] || alignClasses.left,
    tones[tone] || tones.default,
    strong && 'font-bold',
    align === 'right' && 'whitespace-nowrap tabular-nums'
  );
}

export default function PreviewModal({
  isOpen,
  onClose,
  products,
  calculations,
  totals,
  config,
  darkMode,
  t
}) {
  const text = textClasses(darkMode);
  const marginReduction = formatReverseMargin(config.margem, { clampNonPositive: true });
  const marginPrefix = config.margem >= 0 ? '+' : '';
  const subtitle = `${t.ipiLabel.replace(' (%)', '')}: ${config.ipi}% | ${t.freightLabel.replace(' (%)', '')}: ${config.frete}% | ${t.marginLabel.replace(' (%)', '')}: ${marginPrefix}${config.margem}% / -${marginReduction}%`;
  const totalsLabelColSpan = countTotalsLabelColumns(REPORT_COLUMNS);

  const previewCellConfig = {
    numero: { align: 'center', tone: 'muted' },
    quantidade: { align: 'center' },
    descricao: { tone: 'strong', className: 'break-words font-semibold' },
    fornecedor: { className: 'break-words' },
    precoUnitario: { align: 'right', tone: 'muted' },
    ipi: { align: 'right', tone: 'muted' },
    frete: { align: 'right', tone: 'muted' },
    custoRealUnitario: { align: 'right', tone: 'strong', strong: true },
    precoVendaUnitario: { align: 'right', tone: 'sale', strong: true },
    totalCusto: { align: 'right', tone: 'costTotal', strong: true },
    totalVenda: { align: 'right', tone: 'saleTotal', strong: true },
    observacoes: { className: 'break-words' }
  };

  const renderPreviewCell = (column, product, index) => {
    const calc = calculations[product.id];
    const { className, ...cellConfig } = previewCellConfig[column.key] || {};

    return (
      <td key={column.key} className={cx(previewCellClasses(darkMode, cellConfig), className)}>
        {getReportColumnValue(column.key, product, calc, index, formatMoney)}
      </td>
    );
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      darkMode={darkMode}
      title={t.previewTitle}
      subtitle={subtitle}
      maxWidth="max-w-6xl"
      maxHeight="max-h-[calc(100vh-2rem)]"
      closeLabel={t.previewClose}
      footer={(
        <Button darkMode={darkMode} variant="secondary" size="modal" onClick={onClose} className="w-full sm:w-auto">
          {t.previewClose}
        </Button>
      )}
    >
      <div className={cx('mb-4 flex flex-wrap gap-2 text-xs', text.muted)}>
        <span className={cx('rounded-md border px-2.5 py-1.5', darkMode ? 'border-white/10 bg-[#202631]' : 'border-[#e2e6ec] bg-[#f8f9fb]')}>
          <strong className={text.body}>{t.companyLabel}:</strong> {config.empresa || '-'}
        </span>
        <span className={cx('rounded-md border px-2.5 py-1.5', darkMode ? 'border-white/10 bg-[#202631]' : 'border-[#e2e6ec] bg-[#f8f9fb]')}>
          <strong className={text.body}>{t.totalProducts}:</strong> {products.length}
        </span>
      </div>

      <div className={cx('w-full max-w-full overflow-auto rounded-md border', darkMode ? 'border-white/10 bg-[#10141b]' : 'border-[#d8dee7] bg-white')}>
        <table className="w-full min-w-[980px] table-fixed border-separate border-spacing-0 text-[0.74rem]">
          <thead>
            <tr>
              {REPORT_COLUMNS.map(column => (
                <th
                  key={column.key}
                  className={cx(previewHeaderCellClasses(darkMode, column.align), column.previewHeaderClassName)}
                >
                  {getColumnLabel(t, column, 'table')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                {REPORT_COLUMNS.map(column => renderPreviewCell(column, product, index))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={totalsLabelColSpan} className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'text-[0.66rem] uppercase')}>
                {t.totals}
              </td>
              {REPORT_COLUMNS.filter(column => !column.totalsLabelColumn).map(column => {
                const totalValue = getReportTotalValue(column.key, totals, formatMoney);
                const totalTone = column.key === 'totalCusto' ? 'cost' : column.key === 'totalVenda' ? 'sale' : 'default';

                return (
                  <td
                    key={column.key}
                    className={cx(
                      tableFooterCellClasses(darkMode, { align: totalValue ? 'right' : 'left', tone: totalTone }),
                      totalValue && 'whitespace-nowrap tabular-nums'
                    )}
                  >
                    {totalValue}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </ModalShell>
  );
}
