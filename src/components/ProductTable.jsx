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
  t
}) {
  if (products.length === 0) return null;

  const text = textClasses(darkMode);
  const totalsLabelColSpan = countTotalsLabelColumns(REPORT_COLUMNS);

  return (
    <Card darkMode={darkMode} className={cx('overflow-hidden', operationalCardClasses(darkMode, { accent: 'top' }))}>
      <div className="flex flex-col p-3 sm:p-[14px]">
        <div className="mb-2 flex flex-col gap-2 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
          <h2 className={cx('min-w-0 truncate text-sm font-bold leading-5', text.main)}>
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

        <div className={cx(tableWrapClasses(darkMode), 'max-h-[62vh] lg:max-h-[calc(100vh-156px)]')}>
          <table className={productTableClasses()}>
            <thead className={tableHeaderClasses(darkMode)}>
              <tr>
                {REPORT_COLUMNS.map(column => (
                  <th
                    key={column.key}
                    className={cx(tableHeaderCellClasses(darkMode, column.tableHeaderTone), column.tableHeaderClassName)}
                  >
                    {getColumnLabel(t, column, 'table')}
                  </th>
                ))}
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-10')} aria-label={t.delete || 'Remover'}></th>
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
