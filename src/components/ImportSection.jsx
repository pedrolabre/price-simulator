import React from 'react';
import { Check } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { Textarea } from './ui/Field';
import { cx, operationalCardClasses, operationalInputClasses, textClasses } from './ui/themeClasses';

export default function ImportSection({
  textInput,
  onTextChange,
  onProcess,
  darkMode,
  t
}) {
  const text = textClasses(darkMode);

  return (
    <Card darkMode={darkMode} className={cx('h-full', operationalCardClasses(darkMode, { accent: 'top' }))}>
      <div className="flex h-full flex-col p-4 sm:p-[18px]">
        <div className="mb-3 min-w-0">
          <h2 className={cx('text-sm font-bold leading-5', text.main)}>
            {t.importTitle}
          </h2>
          <p className={cx('mt-1 text-xs leading-5', text.muted)}>
            {t.importHint}
          </p>
        </div>

        <Textarea
          darkMode={darkMode}
          className={cx('min-h-[118px] flex-1 resize-y !p-3 font-sans text-[0.82rem] leading-6 lg:min-h-[104px]', operationalInputClasses(darkMode))}
          rows="5"
          placeholder={t.importPlaceholder}
          value={textInput}
          onChange={(e) => onTextChange(e.target.value)}
        />

        <div className="mt-3 flex justify-end">
          <Button
            darkMode={darkMode}
            variant="flatPrimary"
            size="primaryCompact"
            onClick={onProcess}
            className="w-full min-[420px]:w-auto"
          >
            <Check size={15} className="flex-shrink-0" /> {t.processBtn}
          </Button>
        </div>
      </div>
    </Card>
  );
}
