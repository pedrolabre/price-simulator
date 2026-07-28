import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './ui/Button';
import ModalShell from './ui/ModalShell';
import { cx, textClasses } from './ui/themeClasses';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  productCount,
  darkMode,
  t
}) {
  const text = textClasses(darkMode);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      darkMode={darkMode}
      title={t.clear}
      subtitle={t.totalProducts}
      maxWidth="max-w-md"
      closeLabel={t.cancel}
      footer={(
        <>
          <Button darkMode={darkMode} variant="secondary" size="modal" onClick={onClose} className="w-full sm:w-auto">
            {t.cancel}
          </Button>
          <Button darkMode={darkMode} variant="dangerSoft" size="modal" onClick={handleConfirm} className="w-full sm:w-auto">
            {t.clear}
          </Button>
        </>
      )}
    >
      <div className="flex flex-col items-start">
        <div className={cx('mb-4 grid h-14 w-14 place-items-center rounded-md', darkMode ? 'bg-[#35171b] text-[#ff9ea9]' : 'bg-[#fff0f1] text-[#cf1026]')}>
          <AlertTriangle size={26} />
        </div>
        <p className={cx('text-sm leading-relaxed', text.body)}>
          {t.confirmClear(productCount)}
        </p>
      </div>
    </ModalShell>
  );
}
