import React from 'react';
import { X, FileText, Table } from 'lucide-react';

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
  if (!isOpen) return null;

  const overlayBg = darkMode ? 'bg-black/70' : 'bg-black/50';
  const modalBg = darkMode 
    ? 'bg-gray-900 border border-white/10' 
    : 'bg-white border border-gray-200';

  return (
    <div className={`fixed inset-0 ${overlayBg} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${modalBg} rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto`}>
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center rounded-t-2xl">
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl font-bold">{t.previewTitle}</h2>
              {config.empresa && (
                <span className="text-lg font-semibold text-red-100 border-l border-red-400 pl-3">
                  {config.empresa}
                </span>
              )}
            </div>
            <p className="text-sm text-red-100 mt-1">
              {t.ipiLabel.replace(' (%)', '')}: {config.ipi}% | {t.freightLabel.replace(' (%)', '')}: {config.frete}% | {t.marginLabel.replace(' (%)', '')}: +{config.margem}% / -{(config.margem / (100 + config.margem) * 100).toFixed(2)}%
            </p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div>
            <table className="w-full text-sm border-collapse table-fixed">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-2 text-left border w-8">{t.colNum}</th>
                  <th className="p-2 text-left border w-10">{t.colQty}</th>
                  <th className="p-2 text-left border">{t.colDesc}</th>
                  <th className="p-2 text-left border w-28">{t.colSupplier}</th>
                  <th className="p-2 text-right border w-20">{t.colUnitPrice}</th>
                  <th className="p-2 text-right border w-16">{t.colIpi}</th>
                  <th className="p-2 text-right border w-16">{t.colFreight}</th>
                  <th className="p-2 text-right border w-24">{t.colRealCost}</th>
                  <th className="p-2 text-right border w-24">{t.colSalePrice}</th>
                  <th className="p-2 text-right border bg-amber-100 w-24">{t.colTotalCost}</th>
                  <th className="p-2 text-right border bg-green-100 w-24">{t.colTotalSale}</th>
                  <th className="p-2 text-left border w-32">{t.colObs}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => {
                  const calc = calculations[p.id];
                  return (
                    <tr key={p.id} className="border-b">
                      <td className="p-2 border">{i + 1}</td>
                      <td className="p-2 border">{p.quantidade}</td>
                      <td className="p-2 border break-words">{p.descricao}</td>
                      <td className="p-2 border break-words">{p.fornecedor || '-'}</td>
                      <td className="p-2 text-right border">R$ {p.preco.toFixed(2)}</td>
                      <td className="p-2 text-right border">R$ {calc.ipiValue.toFixed(2)}</td>
                      <td className="p-2 text-right border">R$ {calc.freteValue.toFixed(2)}</td>
                      <td className="p-2 text-right border font-bold">R$ {calc.custoRealUnitario.toFixed(2)}</td>
                      <td className="p-2 text-right border font-bold text-green-600">R$ {calc.precoVistaUnitario.toFixed(2)}</td>
                      <td className="p-2 text-right border bg-amber-50 font-bold">R$ {calc.totalCustoReal.toFixed(2)}</td>
                      <td className="p-2 text-right border bg-green-50 font-bold">R$ {calc.totalPrecoVista.toFixed(2)}</td>
                      <td className="p-2 border break-words">{p.observacoes || ''}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="font-bold bg-gray-200">
                <tr>
                  <td colSpan="4" className="p-3 text-right border">{t.totals}</td>
                  <td className="p-3 text-right border">R$ {totals.totalPrecoOriginal.toFixed(2)}</td>
                  <td className="p-3 text-right border">R$ {totals.totalIPI.toFixed(2)}</td>
                  <td className="p-3 text-right border">R$ {totals.totalFrete.toFixed(2)}</td>
                  <td className="p-3 border"></td>
                  <td className="p-3 border"></td>
                  <td className="p-3 text-right border bg-amber-100">R$ {totals.totalCustoReal.toFixed(2)}</td>
                  <td className="p-3 text-right border bg-green-100">R$ {totals.totalPrecoVista.toFixed(2)}</td>
                  <td className="p-3 border"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}