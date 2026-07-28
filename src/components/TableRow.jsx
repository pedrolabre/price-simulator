import React from 'react';
import { Trash2 } from 'lucide-react';
import SupplierInput from './SupplierInput';
import Button from './ui/Button';
import { TextInput } from './ui/Field';
import { cx, moneyCellClasses, tableCellClasses, tableInputClasses, tableRowClasses, textClasses } from './ui/themeClasses';

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
  const formatMoney = (value) => `R$ ${value.toFixed(2)}`;

  return (
    <tr className={tableRowClasses(darkMode)}>
      <td className={cx(tableCellClasses(darkMode, { align: 'center' }), 'font-medium tabular-nums', text.muted)}>
        {index + 1}
      </td>
      <td className={tableCellClasses(darkMode, { align: 'center' })}>
        <TextInput
          darkMode={darkMode}
          type="number"
          value={product.quantidade}
          onChange={(e) => onUpdate(product.id, 'quantidade', e.target.value)}
          size="table"
          className={tableInputClasses(darkMode, 'text-center tabular-nums')}
        />
      </td>
      <td className={tableCellClasses(darkMode)}>
        <TextInput
          darkMode={darkMode}
          type="text"
          value={product.descricao}
          onChange={(e) => onUpdate(product.id, 'descricao', e.target.value)}
          size="table"
          className={tableInputClasses(darkMode, 'truncate')}
          title={product.descricao}
        />
      </td>
      <td className={tableCellClasses(darkMode)}>
        <SupplierInput
          value={product.fornecedor || ''}
          onChange={(val) => onUpdate(product.id, 'fornecedor', val)}
          darkMode={darkMode}
          t={t}
        />
      </td>
      <td className={tableCellClasses(darkMode, { align: 'right' })}>
        <TextInput
          darkMode={darkMode}
          type="number"
          step="0.01"
          value={product.preco}
          onChange={(e) => onUpdate(product.id, 'preco', e.target.value)}
          size="table"
          className={tableInputClasses(darkMode, 'text-right tabular-nums')}
        />
      </td>
      <td className={moneyCellClasses(darkMode)}>{formatMoney(calculations.ipiValue)}</td>
      <td className={moneyCellClasses(darkMode)}>{formatMoney(calculations.freteValue)}</td>
      <td className={moneyCellClasses(darkMode, 'strong')}>{formatMoney(calculations.custoRealUnitario)}</td>
      <td className={moneyCellClasses(darkMode, 'sale')}>{formatMoney(calculations.precoVistaUnitario)}</td>
      <td className={moneyCellClasses(darkMode, 'costTotal')}>
        {formatMoney(calculations.totalCustoReal)}
      </td>
      <td className={moneyCellClasses(darkMode, 'saleTotal')}>
        {formatMoney(calculations.totalPrecoVista)}
      </td>
      <td className={tableCellClasses(darkMode)}>
        <TextInput
          darkMode={darkMode}
          type="text"
          value={product.observacoes || ''}
          onChange={(e) => onUpdate(product.id, 'observacoes', e.target.value)}
          size="table"
          focus="amber"
          placeholder={t.obPlaceholder}
          className={tableInputClasses(darkMode, 'truncate')}
          title={product.observacoes || ''}
        />
      </td>
      <td className={tableCellClasses(darkMode, { align: 'center' })}>
        <Button
          darkMode={darkMode}
          variant="iconDanger"
          size="iconPlain"
          onClick={() => onDelete(product.id)}
          aria-label={t.delete || 'Remover'}
          title={t.delete || 'Remover'}
          className={cx(
            '!h-7 !w-7 !rounded-sm',
            darkMode ? 'hover:bg-[#32171d]' : 'hover:bg-[#fff1f3]'
          )}
        >
          <Trash2 size={15} />
        </Button>
      </td>
    </tr>
  );
}
