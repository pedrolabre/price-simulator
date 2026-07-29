import React from 'react';
import { buttonClasses, cx } from './themeClasses';

export default function Button({
  darkMode = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={cx(buttonClasses({ darkMode, variant, size }), fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  );
}
