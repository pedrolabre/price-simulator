import React from 'react';
import { Trash2 } from 'lucide-react';
import SupplierInput from './SupplierInput';
import Button from './ui/Button';
import { TextInput } from './ui/Field';
import { cx, tableRowClasses, textClasses, totalCellClasses } from './ui/themeClasses';

export default function TableRow({
  product,
  index,
  calculations,
  onUpdate,
  onDelete,
  darkMode,
  t
}) {
  const text = textClasses(darkMode);

  return (
    <tr className={tableRowClasses(darkMode)}>
      <td className={cx('p-2 font-medium', text.muted)}>{index + 1}</td>
      <td className="p-2">
        <TextInput
          darkMode={darkMode}
          type="number"
          value={product.quantidade}
          onChange={(e) => onUpdate(product.id, 'quantidade', e.target.value)}
          size="table"
          className="text-center"
        />
      </td>
      <td className="p-2">
        <TextInput
          darkMode={darkMode}
          type="text"
          value={product.descricao}
          onChange={(e) => onUpdate(product.id, 'descricao', e.target.value)}
          size="table"
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
        <TextInput
          darkMode={darkMode}
          type="number"
          step="0.01"
          value={product.preco}
          onChange={(e) => onUpdate(product.id, 'preco', e.target.value)}
          size="table"
          className="text-right"
        />
      </td>
      <td className={cx('p-2 text-right', text.muted)}>R$ {calculations.ipiValue.toFixed(2)}</td>
      <td className={cx('p-2 text-right', text.muted)}>R$ {calculations.freteValue.toFixed(2)}</td>
      <td className={cx('p-2 text-right font-semibold', text.main)}>R$ {calculations.custoRealUnitario.toFixed(2)}</td>
      <td className="p-2 text-right font-semibold text-green-600">R$ {calculations.precoVistaUnitario.toFixed(2)}</td>
      <td className={cx('p-2 text-right font-bold', totalCellClasses('amberSoft', darkMode))}>
        R$ {calculations.totalCustoReal.toFixed(2)}
      </td>
      <td className={cx('p-2 text-right font-bold', totalCellClasses('greenSoft', darkMode))}>
        R$ {calculations.totalPrecoVista.toFixed(2)}
      </td>
      <td className="p-2">
        <TextInput
          darkMode={darkMode}
          type="text"
          value={product.observacoes || ''}
          onChange={(e) => onUpdate(product.id, 'observacoes', e.target.value)}
          size="table"
          focus="amber"
          placeholder={t.obPlaceholder}
        />
      </td>
      <td className="p-2">
        <Button
          darkMode={darkMode}
          variant="iconDanger"
          size="iconPlain"
          onClick={() => onDelete(product.id)}
          aria-label={t.delete || 'Remover'}
        >
          <Trash2 size={18} />
        </Button>
      </td>
    </tr>
  );
}
