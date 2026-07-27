import React from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import { Textarea } from './ui/Field';
import { cx, textClasses } from './ui/themeClasses';

export default function ImportSection({
  textInput,
  onTextChange,
  onProcess,
  darkMode,
  t
}) {
  const text = textClasses(darkMode);

  return (
    <Card darkMode={darkMode} className="p-4 mb-6 sm:p-6">
      <h2 className={cx('text-lg font-semibold mb-3', text.body)}>
        {t.importTitle}
      </h2>
      <p className={cx('text-sm mb-4', text.muted)}>
        {t.importHint}
      </p>
      <Textarea
        darkMode={darkMode}
        className="mb-4 font-mono text-sm focus:border-transparent"
        rows="6"
        placeholder={t.importPlaceholder}
        value={textInput}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <Button
        darkMode={darkMode}
        variant="primary"
        size="lg"
        fullWidth
        onClick={onProcess}
        className="sm:w-auto"
      >
        {t.processBtn}
      </Button>
    </Card>
  );
}
