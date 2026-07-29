import React from 'react';
import { Plus } from 'lucide-react';
import TableRow from './TableRow';
import Button from './ui/Button';
import Card from './ui/Card';
import { REPORT_COLUMNS, countTotalsLabelColumns, getColumnLabel } from '../constants/columns';
import { formatMoney } from '../utils/formatters';
import {
  cx,
  operationalCardClasses,
  productTableClasses,
  tableFooterCellClasses,
  tableHeaderClasses,
  tableHeaderCellClasses,
  tableWrapClasses,
  textClasses
} from './ui/themeClasses';

export default function ProductTable({
  products,
  calculations,
  totals,
  onAddRow,
  onUpdateProduct,
  onDeleteProduct,
  darkMode,
  t,
  className = ''
}) {
  if (products.length === 0) return null;

  const text = textClasses(darkMode);
  const totalsLabelColSpan = countTotalsLabelColumns(REPORT_COLUMNS);

  return (
    <Card as="section" darkMode={darkMode} className={cx('min-w-0 overflow-hidden', operationalCardClasses(darkMode, { accent: 'top' }), className)}>
      <div className="flex h-full min-h-0 flex-col px-[14px] pb-[14px] pt-3">
        <div className="mb-2 flex flex-shrink-0 flex-col gap-2 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
          <h2 className={cx('min-w-0 truncate text-[0.9rem] font-bold leading-[1.25]', text.main)}>
            {t.processedProducts}
          </h2>
          <Button
            darkMode={darkMode}
            variant="solidSuccess"
            size="primaryCompact"
            onClick={onAddRow}
            className="w-full min-[380px]:w-auto"
          >
            <Plus size={15} className="flex-shrink-0" /> {t.addRow}
          </Button>
        </div>

        <div className={cx(tableWrapClasses(darkMode), 'min-h-[210px] flex-1 min-[981px]:min-h-0')}>
          <table className={productTableClasses()} aria-label={t.processedProducts}>
            <thead className={tableHeaderClasses(darkMode)}>
              <tr>
                {REPORT_COLUMNS.map((column, columnIndex) => (
                  <th
                    key={column.key}
                    className={cx(
                      tableHeaderCellClasses(darkMode, column.tableHeaderTone),
                      columnIndex === 0 && 'rounded-tl-[2px]',
                      column.tableHeaderClassName
                    )}
                  >
                    {getColumnLabel(t, column, 'table')}
                  </th>
                ))}
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-9 rounded-tr-[2px]')} aria-label={t.delete || 'Remover'}></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <TableRow
                  key={product.id}
                  product={product}
                  index={index}
                  calculations={calculations[product.id]}
                  onUpdate={onUpdateProduct}
                  onDelete={onDeleteProduct}
                  darkMode={darkMode}
                  t={t}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={totalsLabelColSpan} className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'text-[0.66rem] uppercase')}>
                  {t.grandTotals}
                </td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalPrecoOriginal)}</td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalIPI)}</td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalFrete)}</td>
                <td className={tableFooterCellClasses(darkMode)}></td>
                <td className={tableFooterCellClasses(darkMode)}></td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right', tone: 'cost' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalCustoReal)}</td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right', tone: 'sale' }), 'whitespace-nowrap tabular-nums')}>{formatMoney(totals.totalPrecoVista)}</td>
                <td className={tableFooterCellClasses(darkMode)}></td>
                <td className={tableFooterCellClasses(darkMode)}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Card>
  );
}
