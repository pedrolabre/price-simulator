import React from 'react';
import { cx, modalOverlayClasses, modalPanelClasses } from './themeClasses';

export default function ModalShell({
  isOpen,
  darkMode,
  children,
  maxWidth = 'max-w-2xl',
  maxHeight = 'max-h-[80vh]',
  lightOnly = false,
  className = '',
  panelClassName = ''
}) {
  if (!isOpen) return null;

  const panelTheme = lightOnly
    ? 'bg-white border border-gray-200 text-gray-900'
    : modalPanelClasses(darkMode);

  return (
    <div className={cx(modalOverlayClasses(darkMode), className)}>
      <div className={cx('w-full overflow-auto rounded-2xl shadow-2xl', maxWidth, maxHeight, panelTheme, panelClassName)}>
        {children}
      </div>
    </div>
  );
}
