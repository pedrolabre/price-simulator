import React from 'react';
import { Plus } from 'lucide-react';
import TableRow from './TableRow';
import Button from './ui/Button';
import Card from './ui/Card';
import {
  cx,
  softCellClasses,
  tableHeaderClasses,
  textClasses,
  totalCellClasses
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
    <Card darkMode={darkMode} className="p-4 sm:p-6">
      <div className="flex flex-col gap-3 mb-5 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
        <h2 className={cx('text-lg font-semibold', text.body)}>{t.processedProducts}</h2>
        <Button
          darkMode={darkMode}
          variant="success"
          size="sm"
          onClick={onAddRow}
          className="w-full min-[380px]:w-auto"
        >
          <Plus size={18} /> {t.addRow}
        </Button>
      </div>

      <div className="w-full max-w-full overflow-x-auto rounded-xl">
        <table className="min-w-[1120px] w-full text-sm table-fixed">
          <thead className={tableHeaderClasses(darkMode)}>
            <tr>
              <th className="p-3 text-left font-semibold w-8">{t.colNum}</th>
              <th className="p-3 text-left font-semibold w-16">{t.colQty}</th>
              <th className="p-3 text-left font-semibold">{t.colDesc}</th>
              <th className="p-3 text-left font-semibold w-28">{t.colSupplier}</th>
              <th className="p-3 text-right font-semibold w-24">{t.colUnitPrice}</th>
              <th className="p-3 text-right font-semibold w-20">{t.colIpi}</th>
              <th className="p-3 text-right font-semibold w-20">{t.colFreight}</th>
              <th className="p-3 text-right font-semibold w-24">{t.colRealCost}</th>
              <th className="p-3 text-right font-semibold w-24">{t.colSalePrice}</th>
              <th className="p-3 text-right font-semibold bg-amber-600/80 w-24">{t.colTotalCost}</th>
              <th className="p-3 text-right font-semibold bg-green-600/80 w-24">{t.colTotalSale}</th>
              <th className="p-3 text-left font-semibold w-36">{t.colObs}</th>
              <th className="p-3 w-10"></th>
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
          <tfoot className={cx(darkMode ? 'bg-white/5' : 'bg-gray-100', 'font-bold text-sm')}>
            <tr>
              <td colSpan="4" className={cx('p-3 text-right uppercase tracking-wide', text.main)}>{t.grandTotals}</td>
              <td className={cx('p-3 text-right', softCellClasses(darkMode), text.main)}>R$ {totals.totalPrecoOriginal.toFixed(2)}</td>
              <td className={cx('p-3 text-right', softCellClasses(darkMode), text.main)}>R$ {totals.totalIPI.toFixed(2)}</td>
              <td className={cx('p-3 text-right', softCellClasses(darkMode), text.main)}>R$ {totals.totalFrete.toFixed(2)}</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className={cx('p-3 text-right', totalCellClasses('amber', darkMode))}>R$ {totals.totalCustoReal.toFixed(2)}</td>
              <td className={cx('p-3 text-right', totalCellClasses('green', darkMode))}>R$ {totals.totalPrecoVista.toFixed(2)}</td>
              <td className="p-3"></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
