import React from 'react';
import { Trash2 } from 'lucide-react';
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
      maxWidth="max-w-[460px]"
      closeLabel={t.cancel}
      showClose={false}
      bodyClassName="!px-[15px] !py-3"
      footerClassName="!px-[15px] !py-2"
      footer={(
        <>
          <Button darkMode={darkMode} variant="secondary" size="modal" onClick={onClose} className="w-full !h-8 sm:w-auto">
            {t.cancel}
          </Button>
          <Button darkMode={darkMode} variant="flatPrimary" size="modal" onClick={handleConfirm} className="w-full !h-8 sm:w-auto">
            {t.clearSimulation || t.clear}
          </Button>
        </>
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cx('grid h-10 w-10 flex-shrink-0 place-items-center rounded-none border', darkMode ? 'border-[#5a2e25] bg-[#35171b] text-[#ff9ea9]' : 'border-[#f0cbd0] bg-[#fff1f3] text-[#cf1026]')}>
          <Trash2 size={21} />
        </div>
        <div className="min-w-0 pt-0.5">
          <h3 className={cx('m-0 text-[1.02rem] font-bold leading-tight', text.main)}>{t.clearTitle || 'Limpar simulacao?'}</h3>
          <p className={cx('mt-1 text-[0.84rem] leading-[1.45]', text.muted)}>
            {t.clearText || t.confirmClear(productCount)}
          </p>
        </div>
      </div>
    </ModalShell>
  );
}
