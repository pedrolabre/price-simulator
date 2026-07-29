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
    <div className={cx('modal-backdrop open', modalOverlayClasses(darkMode), className)} onMouseDown={handleBackdropMouseDown}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        className={cx(
          'modal my-auto flex w-full min-w-0 flex-col overflow-hidden rounded-none',
          maxWidth,
          maxHeight,
          modalPanelClasses(darkMode),
          panelClassName
        )}
      >
        {(title || subtitle || showClose) && (
          <header className={cx('modal-header flex flex-shrink-0 items-start justify-between gap-4 px-[15px] py-[13px]', modalHeaderClasses(), headerClassName)}>
            <div className="min-w-0">
              {title && (
                <h2 className="modal-title m-0 text-base font-extrabold leading-tight tracking-normal">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="modal-subtitle mt-[3px] text-[0.72rem] leading-relaxed text-white/85">
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
                className="modal-close grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-none border border-white/50 bg-transparent text-white transition hover:border-white/75 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                aria-label={closeLabel}
                title={closeLabel}
              >
                <X size={21} />
              </button>
            )}
          </header>
        )}

        <div className={cx('modal-body min-h-0 flex-1 overflow-auto px-[15px] py-[14px]', bodyClassName)}>
          {children}
        </div>

        {footer && (
          <footer className={cx('modal-footer flex flex-shrink-0 flex-col-reverse gap-2 border-t px-[15px] py-[9px] sm:flex-row sm:justify-end', modalFooterClasses(darkMode), footerClassName)}>
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
