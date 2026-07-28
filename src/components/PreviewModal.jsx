import React from 'react';
import Button from './ui/Button';
import ModalShell from './ui/ModalShell';
import { cx, tableFooterCellClasses, textClasses } from './ui/themeClasses';

function formatMoney(value) {
  return `R$ ${Number(value || 0).toFixed(2)}`;
}

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
  const marginReduction = config.margem > 0
    ? (config.margem / (100 + config.margem) * 100).toFixed(2)
    : '0.00';
  const marginPrefix = config.margem >= 0 ? '+' : '';
  const subtitle = `${t.ipiLabel.replace(' (%)', '')}: ${config.ipi}% | ${t.freightLabel.replace(' (%)', '')}: ${config.frete}% | ${t.marginLabel.replace(' (%)', '')}: ${marginPrefix}${config.margem}% / -${marginReduction}%`;

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
              <th className={cx(previewHeaderCellClasses(darkMode, 'center'), 'w-10')}>{t.colNum}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'center'), 'w-[70px]')}>{t.colQty}</th>
              <th className={cx(previewHeaderCellClasses(darkMode), 'w-[250px]')}>{t.colDesc}</th>
              <th className={cx(previewHeaderCellClasses(darkMode), 'w-[140px]')}>{t.colSupplier}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'right'), 'w-[110px]')}>{t.colUnitPrice}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'right'), 'w-[92px]')}>{t.colIpi}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'right'), 'w-[92px]')}>{t.colFreight}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'right'), 'w-[110px]')}>{t.colRealCost}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'right'), 'w-[112px]')}>{t.colSalePrice}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'right'), 'w-[112px]')}>{t.colTotalCost}</th>
              <th className={cx(previewHeaderCellClasses(darkMode, 'right'), 'w-[112px]')}>{t.colTotalSale}</th>
              <th className={cx(previewHeaderCellClasses(darkMode), 'w-[150px]')}>{t.colObs}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const calc = calculations[product.id];

              return (
                <tr key={product.id}>
                  <td className={previewCellClasses(darkMode, { align: 'center', tone: 'muted' })}>{index + 1}</td>
                  <td className={previewCellClasses(darkMode, { align: 'center' })}>{product.quantidade}</td>
                  <td className={cx(previewCellClasses(darkMode, { tone: 'strong' }), 'break-words font-semibold')}>{product.descricao}</td>
                  <td className={cx(previewCellClasses(darkMode), 'break-words')}>{product.fornecedor || '-'}</td>
                  <td className={previewCellClasses(darkMode, { align: 'right', tone: 'muted' })}>{formatMoney(product.preco)}</td>
                  <td className={previewCellClasses(darkMode, { align: 'right', tone: 'muted' })}>{formatMoney(calc.ipiValue)}</td>
                  <td className={previewCellClasses(darkMode, { align: 'right', tone: 'muted' })}>{formatMoney(calc.freteValue)}</td>
                  <td className={previewCellClasses(darkMode, { align: 'right', tone: 'strong', strong: true })}>{formatMoney(calc.custoRealUnitario)}</td>
                  <td className={previewCellClasses(darkMode, { align: 'right', tone: 'sale', strong: true })}>{formatMoney(calc.precoVistaUnitario)}</td>
                  <td className={previewCellClasses(darkMode, { align: 'right', tone: 'costTotal', strong: true })}>{formatMoney(calc.totalCustoReal)}</td>
                  <td className={previewCellClasses(darkMode, { align: 'right', tone: 'saleTotal', strong: true })}>{formatMoney(calc.totalPrecoVista)}</td>
                  <td className={cx(previewCellClasses(darkMode), 'break-words')}>{product.observacoes || ''}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'text-[0.66rem] uppercase')}>
                {t.totals}
              </td>
              <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalPrecoOriginal)}</td>
              <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalIPI)}</td>
              <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalFrete)}</td>
              <td className={tableFooterCellClasses(darkMode)}></td>
              <td className={tableFooterCellClasses(darkMode)}></td>
              <td className={cx(tableFooterCellClasses(darkMode, { align: 'right', tone: 'cost' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalCustoReal)}</td>
              <td className={cx(tableFooterCellClasses(darkMode, { align: 'right', tone: 'sale' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalPrecoVista)}</td>
              <td className={tableFooterCellClasses(darkMode)}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </ModalShell>
  );
}
