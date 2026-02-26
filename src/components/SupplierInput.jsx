import React from 'react';

export default function SupplierInput({ value, onChange, darkMode, t }) {
  const inputBg = darkMode 
  ? 'bg-white/10 text-white border-white/30 backdrop-blur-xl' 
  : 'bg-white/80 backdrop-blur-xl border-gray-300';

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t ? t.supplierRowPlaceholder : 'Fornecedor...'}
      className={`w-full border ${inputBg} rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500/50 transition backdrop-blur-sm`}
    />
  );
}