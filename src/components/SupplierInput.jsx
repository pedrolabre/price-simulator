import React from 'react';
import { TextInput } from './ui/Field';
import { tableInputClasses } from './ui/themeClasses';

export default function SupplierInput({ value, onChange, darkMode, t }) {
  return (
    <TextInput
      darkMode={darkMode}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t ? t.supplierRowPlaceholder : 'Fornecedor...'}
      size="table"
      className={tableInputClasses(darkMode, 'truncate')}
      title={value}
    />
  );
}
