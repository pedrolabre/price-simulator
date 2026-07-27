export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function appShellClasses(darkMode) {
  return cx(
    'min-h-screen overflow-x-hidden px-4 py-6 sm:p-6 lg:p-8 transition-all duration-500',
    darkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200'
  );
}

export function surfaceCardClasses(darkMode) {
  return cx(
    'w-full max-w-full rounded-2xl shadow-xl',
    darkMode
      ? 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl'
      : 'bg-white/70 backdrop-blur-2xl border border-gray-300/30 shadow-2xl'
  );
}

export function textClasses(darkMode) {
  return {
    title: darkMode ? 'text-white' : 'text-gray-900',
    main: darkMode ? 'text-gray-100' : 'text-gray-900',
    body: darkMode ? 'text-gray-200' : 'text-gray-700',
    muted: darkMode ? 'text-gray-400' : 'text-gray-500',
    softMuted: darkMode ? 'text-gray-400' : 'text-gray-600'
  };
}

const inputSizes = {
  header: 'px-3 py-2 text-sm rounded-xl',
  md: 'p-3 rounded-xl',
  textarea: 'p-4 rounded-xl',
  compact: 'p-2 text-sm rounded-lg',
  table: 'p-1.5 rounded-lg'
};

const focusRings = {
  red: 'focus:ring-red-500/50',
  amber: 'focus:ring-amber-500/50',
  green: 'focus:ring-green-500/50'
};

export function inputClasses(darkMode, { size = 'md', focus = 'red', className = '' } = {}) {
  return cx(
    'w-full min-w-0 border transition backdrop-blur-sm focus:outline-none focus:ring-2',
    inputSizes[size],
    focusRings[focus],
    darkMode
      ? 'bg-white/10 text-white border-white/20 placeholder-white/40 backdrop-blur-xl'
      : 'bg-white/80 text-gray-900 border-gray-300 placeholder-gray-400 backdrop-blur-xl',
    className
  );
}

const buttonSizes = {
  sm: 'px-4 py-2 rounded-xl text-sm shadow-lg',
  md: 'px-4 py-2.5 rounded-xl shadow-md',
  lg: 'px-6 py-3 rounded-xl font-semibold shadow-lg',
  action: 'px-3 py-2.5 rounded-xl shadow-md backdrop-blur-sm text-sm sm:px-4 sm:text-base whitespace-nowrap',
  icon: 'p-3 rounded-2xl shadow-lg backdrop-blur-lg',
  iconLang: 'p-2 rounded-2xl shadow-lg backdrop-blur-lg',
  iconPlain: 'p-1 rounded-lg'
};

export function buttonVariantClasses(variant, darkMode) {
  const variants = {
    primary: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
    solidSuccess: 'bg-green-600 hover:bg-green-700 text-white',
    solidDanger: 'bg-red-500 hover:bg-red-600 text-white',
    neutral: 'bg-gray-500 hover:bg-gray-600 text-white',
    subtleGreen: darkMode
      ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
      : 'bg-green-500/10 hover:bg-green-500/20 text-green-700',
    subtleRed: darkMode
      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
      : 'bg-red-500/10 hover:bg-red-500/20 text-red-700',
    subtleBlue: darkMode
      ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'
      : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-700',
    subtleTeal: darkMode
      ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300'
      : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-700',
    subtleOrange: darkMode
      ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300'
      : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-700',
    header: darkMode
      ? 'bg-white/10 hover:bg-white/20'
      : 'bg-gray-900/80 hover:bg-gray-900',
    iconDanger: 'text-red-600 hover:text-red-800'
  };

  return variants[variant] || variants.primary;
}

export function buttonClasses({ darkMode, variant = 'primary', size = 'md' }) {
  return cx(
    'inline-flex min-w-0 items-center justify-center gap-2 transition-all font-medium disabled:cursor-not-allowed disabled:opacity-50',
    buttonSizes[size],
    buttonVariantClasses(variant, darkMode)
  );
}

export function freightNoticeClasses(darkMode) {
  return darkMode
    ? 'bg-yellow-500/20 border-yellow-500/40 backdrop-blur-xl'
    : 'bg-yellow-100/80 border-yellow-300/50 backdrop-blur-xl';
}

export function tableHeaderClasses(darkMode) {
  return cx(
    'text-white',
    darkMode
      ? 'bg-gradient-to-r from-red-600/80 to-red-700/80'
      : 'bg-gradient-to-r from-red-600 to-red-700'
  );
}

export function tableRowClasses(darkMode) {
  return cx(
    'border-b transition',
    darkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'
  );
}

export function softCellClasses(darkMode) {
  return darkMode ? 'bg-white/10' : 'bg-gray-200';
}

export function totalCellClasses(tone, darkMode) {
  const tones = {
    amber: darkMode ? 'bg-amber-500/20 text-amber-200' : 'bg-amber-100 text-amber-800',
    amberSoft: darkMode ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-50 text-amber-700',
    green: darkMode ? 'bg-green-500/20 text-green-200' : 'bg-green-100 text-green-800',
    greenSoft: darkMode ? 'bg-green-500/10 text-green-300' : 'bg-green-50 text-green-700'
  };

  return tones[tone];
}

export function modalOverlayClasses(darkMode) {
  return cx(
    'fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm',
    darkMode ? 'bg-black/70' : 'bg-black/50'
  );
}

export function modalPanelClasses(darkMode) {
  return darkMode ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200';
}

export function modalHeaderClasses() {
  return 'bg-gradient-to-r from-[#C8102E] to-[#E31837] text-white';
}

export function modalFooterClasses(darkMode) {
  return darkMode
    ? 'bg-gradient-to-t from-gray-900 to-transparent'
    : 'bg-gradient-to-t from-gray-100 to-transparent';
}
