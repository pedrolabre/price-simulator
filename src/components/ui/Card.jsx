import React from 'react';
import { cx, surfaceCardClasses } from './themeClasses';

export default function Card({ as: Component = 'div', darkMode, className = '', children }) {
  return (
    <Component className={cx(surfaceCardClasses(darkMode), className)}>
      {children}
    </Component>
  );
}
