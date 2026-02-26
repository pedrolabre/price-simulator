import React from 'react';
import { Plus } from 'lucide-react';
import TableRow from './TableRow';

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

  const cardBg = darkMode 
  ? 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl' 
  : 'bg-white/70 backdrop-blur-2xl border border-gray-300/30 shadow-2xl';

  const headerBg = darkMode 
    ? 'bg-gradient-to-r from-red-600/80 to-red-700/80' 
    : 'bg-gradient-to-r from-red-600 to-red-700';

  const textColor = darkMode ? 'text-gray-200' : 'text-gray-700';
  const textMain = darkMode ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className={`${cardBg} rounded-2xl shadow-xl p-6`}>
      <div className="flex justify-between items-center mb-5">
        <h2 className={`text-lg font-semibold ${textColor}`}>{t.processedProducts}</h2>
        <button
          onClick={onAddRow}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg font-medium"
        >
          <Plus size={18} /> {t.addRow}
        </button>
      </div>

      <div className="rounded-xl w-full">
        <table className="w-full text-sm table-fixed">
          <thead className={`${headerBg} text-white`}>
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
          <tfoot className={`${darkMode ? 'bg-white/5' : 'bg-gray-100'} font-bold text-sm`}>
            <tr>
              <td colSpan="4" className={`p-3 text-right ${textMain} uppercase tracking-wide`}>{t.grandTotals}</td>
              <td className={`p-3 text-right ${darkMode ? 'bg-white/10' : 'bg-gray-200'} ${textMain}`}>R$ {totals.totalPrecoOriginal.toFixed(2)}</td>
              <td className={`p-3 text-right ${darkMode ? 'bg-white/10' : 'bg-gray-200'} ${textMain}`}>R$ {totals.totalIPI.toFixed(2)}</td>
              <td className={`p-3 text-right ${darkMode ? 'bg-white/10' : 'bg-gray-200'} ${textMain}`}>R$ {totals.totalFrete.toFixed(2)}</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className={`p-3 text-right ${darkMode ? 'bg-amber-500/20 text-amber-200' : 'bg-amber-100 text-amber-800'}`}>R$ {totals.totalCustoReal.toFixed(2)}</td>
              <td className={`p-3 text-right ${darkMode ? 'bg-green-500/20 text-green-200' : 'bg-green-100 text-green-800'}`}>R$ {totals.totalPrecoVista.toFixed(2)}</td>
              <td className="p-3"></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}