import React from 'react';
import { Plus } from 'lucide-react';
import TableRow from './TableRow';
import Button from './ui/Button';
import Card from './ui/Card';
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
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-10 text-center')}>{t.colNum}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[70px] text-center')}>{t.colQty}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[250px]')}>{t.colDesc}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[140px]')}>{t.colSupplier}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[110px] text-right')}>{t.colUnitPrice}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[92px] text-right')}>{t.colIpi}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[92px] text-right')}>{t.colFreight}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[110px] text-right')}>{t.colRealCost}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[112px] text-right')}>{t.colSalePrice}</th>
                <th className={cx(tableHeaderCellClasses(darkMode, 'cost'), 'w-[112px] text-right')}>{t.colTotalCost}</th>
                <th className={cx(tableHeaderCellClasses(darkMode, 'sale'), 'w-[112px] text-right')}>{t.colTotalSale}</th>
                <th className={cx(tableHeaderCellClasses(darkMode), 'w-[150px]')}>{t.colObs}</th>
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
                <td colSpan="4" className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'text-[0.66rem] uppercase')}>
                  {t.grandTotals}
                </td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>R$ {totals.totalPrecoOriginal.toFixed(2)}</td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>R$ {totals.totalIPI.toFixed(2)}</td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right' }), 'whitespace-nowrap tabular-nums')}>R$ {totals.totalFrete.toFixed(2)}</td>
                <td className={tableFooterCellClasses(darkMode)}></td>
                <td className={tableFooterCellClasses(darkMode)}></td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right', tone: 'cost' }), 'whitespace-nowrap tabular-nums')}>R$ {totals.totalCustoReal.toFixed(2)}</td>
                <td className={cx(tableFooterCellClasses(darkMode, { align: 'right', tone: 'sale' }), 'whitespace-nowrap tabular-nums')}>R$ {totals.totalPrecoVista.toFixed(2)}</td>
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
