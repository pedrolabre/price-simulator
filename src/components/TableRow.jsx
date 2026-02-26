import React from 'react';
import { Trash2 } from 'lucide-react';
import SupplierInput from './SupplierInput';

export default function TableRow({ 
  product, 
  index, 
  calculations,
  onUpdate, 
  onDelete, 
  darkMode,
  t
}) {
  const inputBg = darkMode 
  ? 'bg-white/10 text-white border-white/20 backdrop-blur-xl' 
  : 'bg-white/80 backdrop-blur-xl border-gray-300';

  const textMain = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <tr className={`border-b ${darkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'} transition`}>
      <td className={`p-2 ${textMuted} font-medium`}>{index + 1}</td>
      <td className="p-2">
        <input
          type="number"
          value={product.quantidade}
          onChange={(e) => onUpdate(product.id, 'quantidade', e.target.value)}
          className={`w-full border rounded-lg p-1.5 text-center ${inputBg} focus:ring-2 focus:ring-red-500/50 transition`}
        />
      </td>
      <td className="p-2">
        <input
          type="text"
          value={product.descricao}
          onChange={(e) => onUpdate(product.id, 'descricao', e.target.value)}
          className={`w-full border rounded-lg p-1.5 ${inputBg} focus:ring-2 focus:ring-red-500/50 transition`}
        />
      </td>
      <td className="p-2">
        <SupplierInput
          value={product.fornecedor || ''}
          onChange={(val) => onUpdate(product.id, 'fornecedor', val)}
          darkMode={darkMode}
          t={t}
        />
      </td>
      <td className="p-2 text-right">
        <input
          type="number"
          step="0.01"
          value={product.preco}
          onChange={(e) => onUpdate(product.id, 'preco', e.target.value)}
          className={`w-full border rounded-lg p-1.5 text-right ${inputBg} focus:ring-2 focus:ring-red-500/50 transition`}
        />
      </td>
      <td className={`p-2 text-right ${textMuted}`}>R$ {calculations.ipiValue.toFixed(2)}</td>
      <td className={`p-2 text-right ${textMuted}`}>R$ {calculations.freteValue.toFixed(2)}</td>
      <td className={`p-2 text-right font-semibold ${textMain}`}>R$ {calculations.custoRealUnitario.toFixed(2)}</td>
      <td className="p-2 text-right font-semibold text-green-600">R$ {calculations.precoVistaUnitario.toFixed(2)}</td>
      <td className={`p-2 text-right font-bold ${darkMode ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
        R$ {calculations.totalCustoReal.toFixed(2)}
      </td>
      <td className={`p-2 text-right font-bold ${darkMode ? 'bg-green-500/10 text-green-300' : 'bg-green-50 text-green-700'}`}>
        R$ {calculations.totalPrecoVista.toFixed(2)}
      </td>
      <td className="p-2">
        <input
          type="text"
          value={product.observacoes || ''}
          onChange={(e) => onUpdate(product.id, 'observacoes', e.target.value)}
          className={`w-full border rounded-lg p-1.5 ${inputBg} focus:ring-2 focus:ring-amber-500/50 transition`}
          placeholder={t.obPlaceholder}
        />
      </td>
      <td className="p-2">
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}