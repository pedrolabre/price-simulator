import React from 'react';
import { Trash2 } from 'lucide-react';
import SupplierInput from './SupplierInput';
import Button from './ui/Button';
import { TextInput } from './ui/Field';
import { REPORT_COLUMNS } from '../constants/columns';
import { formatMoney } from '../utils/formatters';
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
  const renderCell = (column) => {
    switch (column.key) {
      case 'numero':
        return (
          <td key={column.key} className={cx(tableCellClasses(darkMode, { align: 'center' }), 'font-medium tabular-nums', text.muted)}>
            {index + 1}
          </td>
        );
      case 'quantidade':
        return (
          <td key={column.key} className={tableCellClasses(darkMode, { align: 'center' })}>
            <TextInput
              darkMode={darkMode}
              type="number"
              value={product.quantidade}
              onChange={(e) => onUpdate(product.id, 'quantidade', e.target.value)}
              size="table"
              className={tableInputClasses(darkMode, 'text-center tabular-nums')}
            />
          </td>
        );
      case 'descricao':
        return (
          <td key={column.key} className={tableCellClasses(darkMode)}>
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
        );
      case 'fornecedor':
        return (
          <td key={column.key} className={tableCellClasses(darkMode)}>
            <SupplierInput
              value={product.fornecedor || ''}
              onChange={(val) => onUpdate(product.id, 'fornecedor', val)}
              darkMode={darkMode}
              t={t}
            />
          </td>
        );
      case 'precoUnitario':
        return (
          <td key={column.key} className={tableCellClasses(darkMode, { align: 'right' })}>
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
        );
      case 'ipi':
        return <td key={column.key} className={moneyCellClasses(darkMode)}>{formatMoney(calculations.ipiValue)}</td>;
      case 'frete':
        return <td key={column.key} className={moneyCellClasses(darkMode)}>{formatMoney(calculations.freteValue)}</td>;
      case 'custoRealUnitario':
        return <td key={column.key} className={moneyCellClasses(darkMode, 'strong')}>{formatMoney(calculations.custoRealUnitario)}</td>;
      case 'precoVendaUnitario':
        return <td key={column.key} className={moneyCellClasses(darkMode, 'sale')}>{formatMoney(calculations.precoVistaUnitario)}</td>;
      case 'totalCusto':
        return (
          <td key={column.key} className={moneyCellClasses(darkMode, 'costTotal')}>
            {formatMoney(calculations.totalCustoReal)}
          </td>
        );
      case 'totalVenda':
        return (
          <td key={column.key} className={moneyCellClasses(darkMode, 'saleTotal')}>
            {formatMoney(calculations.totalPrecoVista)}
          </td>
        );
      case 'observacoes':
        return (
          <td key={column.key} className={tableCellClasses(darkMode)}>
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
        );
      default:
        return null;
    }
  };

  return (
    <tr className={tableRowClasses(darkMode)}>
      {REPORT_COLUMNS.map(renderCell)}
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
