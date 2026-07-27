import React from 'react';
import { cx, inputClasses, textClasses } from './themeClasses';

export default function Field({
  darkMode,
  label,
  icon: Icon,
  className = '',
  labelClassName = '',
  children
}) {
  const text = textClasses(darkMode);

  return (
    <div className={className}>
      <label className={cx('mb-2 flex items-center gap-2 text-sm font-medium', text.body, labelClassName)}>
        {Icon && <Icon size={16} />}
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextInput({ darkMode, size = 'md', focus = 'red', className = '', ...props }) {
  return (
    <input
      className={inputClasses(darkMode, { size, focus, className })}
      {...props}
    />
  );
}

export function Textarea({ darkMode, focus = 'red', className = '', ...props }) {
  return (
    <textarea
      className={inputClasses(darkMode, { size: 'textarea', focus, className })}
      {...props}
    />
  );
}
