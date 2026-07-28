export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function appShellClasses(darkMode) {
  return cx(
    'min-h-screen overflow-x-hidden px-3 py-4 text-base transition-colors duration-200 sm:px-4 lg:px-6',
    darkMode
      ? 'bg-[#111318] text-[#f5f7fa]'
      : 'bg-[#f6f7f9] text-[#111827]'
  );
}

export function appContentClasses() {
  return 'app-shell mx-auto flex w-full max-w-[1320px] min-w-0 flex-col pb-6';
}

export function surfaceCardClasses(darkMode) {
  return cx(
    'w-full max-w-full rounded-2xl shadow-xl',
    darkMode
      ? 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl'
      : 'bg-white/70 backdrop-blur-2xl border border-gray-300/30 shadow-2xl'
  );
}

export function operationalCardClasses(darkMode, { accent = 'none' } = {}) {
  const accentClasses = {
    none: '',
    left: '!border-l-[3px] !border-l-[#cf1026]',
    top: '!border-t-2 !border-t-[#cf1026]'
  };

  return cx(
    'overflow-hidden !rounded-md !shadow-none !backdrop-blur-none',
    darkMode
      ? '!border-white/10 !bg-[#171b22]'
      : '!border-[#d8dee7] !bg-white',
    accentClasses[accent]
  );
}

export function textClasses(darkMode) {
  return {
    title: darkMode ? 'text-[#f5f7fa]' : 'text-[#111827]',
    main: darkMode ? 'text-[#f5f7fa]' : 'text-[#111827]',
    body: darkMode ? 'text-[#d4d8df]' : 'text-[#374151]',
    muted: darkMode ? 'text-[#9ca3af]' : 'text-[#6b7280]',
    softMuted: darkMode ? 'text-[#9ca3af]' : 'text-[#4b5563]'
  };
}

const inputSizes = {
  header: 'h-9 px-2.5 text-[0.82rem] rounded-xl',
  md: 'p-3 rounded-xl',
  textarea: 'p-4 rounded-xl',
  control: 'h-9 px-3 text-sm rounded-md',
  compact: 'p-2 text-sm rounded-lg',
  table: 'h-8 px-2 py-0 text-[0.76rem] rounded-sm'
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

export function operationalInputClasses(darkMode, className = '') {
  return cx(
    '!rounded !border !shadow-none !backdrop-blur-none focus:!border-[#8d98a7] focus:!ring-1',
    darkMode
      ? '!border-white/10 !bg-[#10141b] !text-[#f5f7fa] placeholder:!text-[#697386] focus:!ring-white/10'
      : '!border-[#c7ced8] !bg-white !text-[#111827] placeholder:!text-[#99a3b3] focus:!ring-gray-900/5',
    className
  );
}

export function tableInputClasses(darkMode, className = '') {
  return cx(
    operationalInputClasses(darkMode),
    '!h-8 !rounded-sm !border-transparent !bg-transparent !px-2 !py-0 text-[0.76rem]',
    'hover:!border-[#c7ced8] focus:!border-[#8d98a7] focus:!ring-1',
    darkMode
      ? 'hover:!border-white/20 focus:!bg-[#10141b] focus:!ring-white/10'
      : 'focus:!bg-white focus:!ring-gray-900/5',
    className
  );
}

const buttonSizes = {
  sm: 'px-4 py-2 rounded-xl text-sm shadow-lg',
  md: 'px-4 py-2.5 rounded-xl shadow-md',
  lg: 'px-6 py-3 rounded-xl font-semibold shadow-lg',
  modal: 'h-10 px-4 rounded-md text-sm font-semibold shadow-none',
  action: 'px-3 py-2.5 rounded-xl shadow-md backdrop-blur-sm text-sm sm:px-4 sm:text-base whitespace-nowrap',
  summaryAction: 'h-8 px-2.5 rounded-md border text-xs shadow-none backdrop-blur-none sm:px-3 whitespace-nowrap',
  primaryCompact: 'h-9 px-4 rounded-md text-sm font-semibold shadow-none',
  toggle: 'h-8 px-3 rounded-md border text-xs shadow-none',
  icon: 'p-3 rounded-2xl shadow-lg backdrop-blur-lg',
  iconLang: 'p-2 rounded-2xl shadow-lg backdrop-blur-lg',
  topbarIcon: 'h-9 w-9 rounded-xl shadow-sm',
  topbarLang: 'h-9 w-9 rounded-xl shadow-sm',
  iconPlain: 'p-1 rounded-lg'
};

export function buttonVariantClasses(variant, darkMode) {
  const variants = {
    primary: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
    solidSuccess: 'bg-green-600 hover:bg-green-700 text-white',
    solidDanger: 'bg-red-500 hover:bg-red-600 text-white',
    neutral: 'bg-gray-500 hover:bg-gray-600 text-white',
    secondary: darkMode
      ? 'border border-white/10 bg-[#171b22] text-[#d4d8df] hover:bg-[#202631]'
      : 'border border-[#d8dee7] bg-white text-[#374151] hover:bg-[#f8f9fb]',
    dangerSoft: darkMode
      ? 'border border-[#5a2e25] bg-[#3b211b] text-[#ffb8a7] hover:bg-[#4a2b22]'
      : 'border border-[#ffded0] bg-[#fff1ea] text-[#b93a20] hover:bg-[#ffe8dc]',
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
    flatPrimary: darkMode
      ? 'border border-[#cf1026] bg-[#cf1026] text-white hover:bg-[#ad0b1d]'
      : 'border border-[#cf1026] bg-[#cf1026] text-white hover:bg-[#ad0b1d]',
    actionClear: darkMode
      ? 'border-[#573129] bg-[#3b231d] text-[#ffb39e] hover:bg-[#4a2b22]'
      : 'border-[#e8c1b5] bg-white text-[#cf1026] hover:bg-[#fff1f3] hover:text-[#ad0b1d]',
    actionPreview: darkMode
      ? 'border-[#263d63] bg-[#172437] text-[#9ec4ff] hover:bg-[#1d2e48]'
      : 'border-[#cfdcf2] bg-white text-[#275ad8] hover:bg-[#eef4ff]',
    actionExcel: darkMode
      ? 'border-[#22462f] bg-[#16281d] text-[#80d29f] hover:bg-[#1b3525]'
      : 'border-[#b9dec7] bg-white text-[#0f8a45] hover:bg-[#e9f7ef]',
    actionHtml: darkMode
      ? 'border-[#245052] bg-[#153434] text-[#70d8d6] hover:bg-[#1a4141]'
      : 'border-[#bfdfdd] bg-white text-[#087d7e] hover:bg-[#e9f8f7]',
    actionPdf: darkMode
      ? 'border-[#5c2730] bg-[#341b20] text-[#ff9ea9] hover:bg-[#421f26]'
      : 'border-[#e8aeb6] bg-white text-[#cf1026] hover:bg-[#fff1f3]',
    freightOn: darkMode
      ? 'border-[#2b7448] bg-[#12321e] text-[#9df0b8] hover:bg-[#183f27]'
      : 'border-[#91caa3] bg-[#e9f7ef] text-[#0f7a3d] hover:bg-[#dcf2e5]',
    freightOff: darkMode
      ? 'border-[#704031] bg-[#3b231d] text-[#ffb39e] hover:bg-[#4a2b22]'
      : 'border-[#e8c1b5] bg-[#fff5ef] text-[#b93a20] hover:bg-[#ffede3]',
    header: darkMode
      ? 'bg-white/10 hover:bg-white/20'
      : 'bg-gray-900/80 hover:bg-gray-900',
    topbar: darkMode
      ? 'border border-white/10 bg-[#303744] text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)] hover:-translate-y-px hover:bg-[#3a4352]'
      : 'border border-transparent bg-[#303744] text-white shadow-[0_8px_18px_rgba(24,31,43,0.18)] hover:-translate-y-px hover:bg-[#232a35]',
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

export function tableHeaderClasses() {
  return 'text-white';
}

export function tableWrapClasses(darkMode) {
  return cx(
    'w-full max-w-full overflow-auto rounded border shadow-none',
    darkMode ? 'border-white/10 bg-[#10141b]' : 'border-[#d8dee7] bg-white'
  );
}

export function productTableClasses() {
  return 'w-full min-w-[1120px] table-fixed border-separate border-spacing-0 text-[0.74rem]';
}

export function tableHeaderCellClasses(darkMode, tone = 'default', className = '') {
  const tones = {
    default: darkMode
      ? 'border-b-[#b91f32] border-r-white/20 bg-[#e62d43] text-white'
      : 'border-b-[#a80d1f] border-r-white/20 bg-[#cf1026] text-white',
    cost: darkMode
      ? 'border-b-[#6d4c12] border-r-white/20 bg-[#8b641d] text-[#fff4d2]'
      : 'border-b-[#d99e0d] border-r-white/25 bg-[#f3bd2f] text-[#302000]',
    sale: darkMode
      ? 'border-b-[#10482b] border-r-white/20 bg-[#17613b] text-[#eafff1]'
      : 'border-b-[#176437] border-r-white/20 bg-[#23824a] text-white'
  };

  return cx(
    'sticky top-0 z-10 whitespace-nowrap border-b border-r px-2 py-2 align-middle text-[0.66rem] font-bold leading-tight last:border-r-0',
    tones[tone] || tones.default,
    className
  );
}

export function tableRowClasses(darkMode) {
  return cx('group transition-colors', darkMode ? 'text-[#f5f7fa]' : 'text-[#111827]');
}

export function tableCellClasses(darkMode, { align = 'left', interactive = true, className = '' } = {}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return cx(
    'border-b border-r px-[5px] py-[5px] align-middle last:border-r-0 transition-colors',
    darkMode ? 'border-white/10 bg-[#10141b]' : 'border-[#dfe3e8] bg-white',
    interactive && (darkMode ? 'group-hover:bg-[#1d242e]' : 'group-hover:bg-[#fbfcfd]'),
    alignClasses[align] || alignClasses.left,
    className
  );
}

export function tableFooterCellClasses(darkMode, { align = 'left', tone = 'default', className = '' } = {}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const tones = {
    default: darkMode ? 'bg-[#1d242e] text-[#d4d8df]' : 'bg-[#f8f9fb] text-[#374151]',
    cost: totalCellClasses('amber', darkMode),
    sale: totalCellClasses('green', darkMode)
  };

  return cx(
    'border-r border-t px-[5px] py-[7px] align-middle text-[0.74rem] font-bold last:border-r-0',
    darkMode ? 'border-white/10' : 'border-[#d0d7e2]',
    alignClasses[align] || alignClasses.left,
    tones[tone] || tones.default,
    className
  );
}

export function moneyCellClasses(darkMode, tone = 'muted', className = '') {
  const tones = {
    muted: darkMode ? 'text-[#9ca3af]' : 'text-[#596273]',
    strong: darkMode ? 'font-bold text-[#f5f7fa]' : 'font-bold text-[#111827]',
    sale: darkMode ? 'font-bold text-[#46d27f]' : 'font-bold text-[#0f8a45]',
    costTotal: totalCellClasses('amberSoft', darkMode),
    saleTotal: totalCellClasses('greenSoft', darkMode)
  };

  const isTotal = tone === 'costTotal' || tone === 'saleTotal';

  return cx(
    tableCellClasses(darkMode, { align: 'right', interactive: !isTotal }),
    'whitespace-nowrap tabular-nums',
    tones[tone] || tones.muted,
    className
  );
}

export function softCellClasses(darkMode) {
  return darkMode ? 'bg-[#1d242e]' : 'bg-[#f8f9fb]';
}

export function totalCellClasses(tone, darkMode) {
  const tones = {
    amber: darkMode ? 'bg-[#292419] text-[#f4c95f]' : 'bg-[#fff2bd] text-[#8a5a00]',
    amberSoft: darkMode ? 'bg-[#292419] text-[#f4c95f]' : 'bg-[#fff2bd] text-[#8a5a00]',
    green: darkMode ? 'bg-[#17261e] text-[#4bd486]' : 'bg-[#e9f7ef] text-[#0f8a45]',
    greenSoft: darkMode ? 'bg-[#17261e] text-[#4bd486]' : 'bg-[#e9f7ef] text-[#0f8a45]'
  };

  return tones[tone];
}

export function modalOverlayClasses(darkMode) {
  return cx(
    'fixed inset-0 z-50 grid place-items-center overflow-y-auto p-3 backdrop-blur-[7px] sm:p-5',
    darkMode ? 'bg-[#05070b]/75' : 'bg-[#0d121a]/60'
  );
}

export function modalPanelClasses(darkMode) {
  return darkMode
    ? 'border border-white/10 bg-[#171b22] text-[#f5f7fa] shadow-[0_24px_70px_rgba(0,0,0,0.46)]'
    : 'border border-[#e2e6ec] bg-white text-[#111827] shadow-[0_20px_55px_rgba(17,24,39,0.18)]';
}

export function modalHeaderClasses() {
  return 'bg-gradient-to-r from-[#C8102E] to-[#E31837] text-white';
}

export function modalFooterClasses(darkMode) {
  return darkMode
    ? 'border-white/10 bg-[#202631]'
    : 'border-[#e2e6ec] bg-[#f8f9fb]';
}
