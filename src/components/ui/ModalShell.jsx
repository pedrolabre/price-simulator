import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  cx,
  modalFooterClasses,
  modalHeaderClasses,
  modalOverlayClasses,
  modalPanelClasses
} from './themeClasses';

export default function ModalShell({
  isOpen,
  onClose,
  darkMode,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-2xl',
  maxHeight = 'max-h-[calc(100vh-2rem)]',
  className = '',
  panelClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  closeLabel = 'Fechar',
  closeOnBackdrop = true,
  showClose = true
}) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 50);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropMouseDown = (event) => {
    if (closeOnBackdrop && event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className={cx(modalOverlayClasses(darkMode), className)} onMouseDown={handleBackdropMouseDown}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        className={cx(
          'my-auto flex w-full min-w-0 flex-col overflow-hidden rounded-[20px]',
          maxWidth,
          maxHeight,
          modalPanelClasses(darkMode),
          panelClassName
        )}
      >
        {(title || subtitle || showClose) && (
          <header className={cx('flex flex-shrink-0 items-start justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5', modalHeaderClasses(), headerClassName)}>
            <div className="min-w-0">
              {title && (
                <h2 className="m-0 text-lg font-extrabold leading-tight tracking-tight sm:text-xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-1 text-xs leading-relaxed text-white/85 sm:text-sm">
                  {subtitle}
                </p>
              )}
            </div>
            {showClose && onClose && (
              <button
                ref={closeButtonRef}
                type="button"
                autoFocus
                onClick={onClose}
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-md text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
                aria-label={closeLabel}
                title={closeLabel}
              >
                <X size={21} />
              </button>
            )}
          </header>
        )}

        <div className={cx('min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-5', bodyClassName)}>
          {children}
        </div>

        {footer && (
          <footer className={cx('flex flex-shrink-0 flex-col-reverse gap-2 border-t px-4 py-4 sm:flex-row sm:justify-end sm:px-6', modalFooterClasses(darkMode), footerClassName)}>
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
