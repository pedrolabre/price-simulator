export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function appShellClasses(darkMode, hasResults = false) {
  return cx(
    'min-h-screen overflow-x-hidden text-base transition-colors duration-200',
    hasResults && 'min-[981px]:h-screen min-[981px]:overflow-hidden',
    darkMode
      ? 'bg-[#111318] text-[#f5f7fa]'
      : 'bg-[#f6f7f9] text-[#111827]'
  );
}

export function appContentClasses(hasResults = false) {
  return cx(
    'mx-auto flex w-[calc(100%_-_28px)] max-w-[1360px] min-w-0 flex-col pt-4',
    hasResults
      ? 'pb-2.5 min-[981px]:h-screen min-[981px]:min-h-0 min-[981px]:overflow-hidden'
      : 'pb-7'
  );
}

export function surfaceCardClasses(darkMode) {
  return cx(
    'w-full max-w-full overflow-hidden rounded-[4px] border shadow-none backdrop-blur-none',
    darkMode
      ? 'border-white/10 bg-[#171b22]'
      : 'border-[#d8dee7] bg-white'
  );
}

export function operationalCardClasses(darkMode, { accent = 'none' } = {}) {
  const accentClasses = {
    none: '',
    left: '!border-l-[3px] !border-l-[#cf1026]',
    top: '!border-t-2 !border-t-[#cf1026]'
  };

  return cx(
    '!rounded-none !shadow-none !backdrop-blur-none',
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
  header: 'h-9 px-2.5 text-[0.82rem] rounded-[3px]',
  md: 'p-3 rounded-[3px]',
  textarea: 'px-3 py-[11px] rounded-[3px]',
  control: 'h-9 px-3 text-[0.82rem] rounded-[3px]',
  compact: 'p-2 text-sm rounded-[3px]',
  table: 'h-[22px] px-1.5 py-0 text-[0.73rem] rounded-[2px]'
};

const focusRings = {
  red: 'focus:ring-[#111827]/5',
  amber: 'focus:ring-[#111827]/5',
  green: 'focus:ring-[#111827]/5'
};

export function inputClasses(darkMode, { size = 'md', focus = 'red', className = '' } = {}) {
  return cx(
    'w-full min-w-0 border transition focus:outline-none focus:ring-2',
    inputSizes[size],
    focusRings[focus],
    darkMode
      ? 'border-white/10 bg-[#10141b] text-[#f5f7fa] placeholder:text-[#697386]'
      : 'border-[#c7ced8] bg-white text-[#111827] placeholder:text-[#99a3b3]',
    className
  );
}

export function operationalInputClasses(darkMode, className = '') {
  return cx(
    '!rounded-[3px] !border !shadow-none !backdrop-blur-none focus:!border-[#8d98a7] focus:!ring-2',
    darkMode
      ? '!border-white/10 !bg-[#10141b] !text-[#f5f7fa] placeholder:!text-[#697386] focus:!ring-white/10'
      : '!border-[#c7ced8] !bg-white !text-[#111827] placeholder:!text-[#99a3b3] focus:!ring-gray-900/5',
    className
  );
}

export function tableInputClasses(darkMode, className = '') {
  return cx(
    operationalInputClasses(darkMode),
    '!h-[22px] !rounded-[2px] !border-transparent !bg-transparent !px-1.5 !py-0 text-[0.73rem]',
    'hover:!border-[#c7ced8] focus:!border-[#8d98a7] focus:!ring-1',
    darkMode
      ? 'hover:!border-white/20 focus:!bg-[#10141b] focus:!ring-white/10'
      : 'focus:!bg-white focus:!ring-gray-900/5',
    className
  );
}

const buttonSizes = {
  sm: 'px-4 py-2 rounded-[3px] text-sm shadow-none',
  md: 'px-4 py-2.5 rounded-[3px] shadow-none',
  lg: 'px-6 py-3 rounded-[3px] font-semibold shadow-none',
  modal: 'h-[34px] px-3 rounded-none text-[0.78rem] font-semibold shadow-none',
  action: 'px-3 py-2.5 rounded-[3px] shadow-none text-sm sm:px-4 sm:text-base whitespace-nowrap',
  summaryAction: 'h-8 px-[9px] rounded-[3px] border text-[0.7rem] font-semibold shadow-none whitespace-nowrap',
  primaryCompact: 'h-[34px] px-3 rounded-[3px] text-[0.78rem] font-bold shadow-none',
  toggle: 'h-8 px-3 rounded-[3px] border text-xs shadow-none',
  icon: 'p-3 rounded-[3px] shadow-none',
  iconLang: 'p-2 rounded-[3px] shadow-none',
  topbarIcon: 'h-9 w-9 rounded-[3px] shadow-none',
  topbarLang: 'h-9 w-9 rounded-[3px] shadow-none text-xs font-semibold',
  iconPlain: 'h-[23px] w-[23px] p-0 rounded-[2px] shadow-none'
};

export function buttonVariantClasses(variant, darkMode) {
  const variants = {
    primary: 'border border-[#cf1026] bg-[#cf1026] text-white hover:bg-[#ad0b1d]',
    success: 'border border-[#159447] bg-[#159447] text-white hover:bg-[#0f7a3d]',
    solidSuccess: darkMode
      ? 'border border-[#2b7448] bg-[#171b22] text-[#80d29f] hover:bg-[#1b3525]'
      : 'border border-[#9bcfb0] bg-white text-[#0f8a45] hover:bg-[#e9f7ef]',
    successOutline: darkMode
      ? 'border border-[#2b7448] bg-[#171b22] text-[#80d29f] hover:bg-[#1b3525]'
      : 'border border-[#9bcfb0] bg-white text-[#0f8a45] hover:bg-[#e9f7ef]',
    solidDanger: 'border border-[#cf1026] bg-[#cf1026] text-white hover:bg-[#ad0b1d]',
    neutral: 'border border-[#8d98a7] bg-[#8d98a7] text-white hover:bg-[#778393]',
    secondary: darkMode
      ? 'border border-white/10 bg-[#171b22] text-[#d4d8df] hover:bg-[#202631]'
      : 'border border-[#d8dee7] bg-white text-[#374151] hover:bg-[#f8f9fb]',
    dangerSoft: darkMode
      ? 'border border-[#5a2e25] bg-[#3b211b] text-[#ffb8a7] hover:bg-[#4a2b22]'
      : 'border border-[#ffded0] bg-[#fff1ea] text-[#b93a20] hover:bg-[#ffe8dc]',
    subtleGreen: darkMode
      ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
      : 'bg-green-500/10 text-green-700 hover:bg-green-500/20',
    subtleRed: darkMode
      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
      : 'bg-red-500/10 text-red-700 hover:bg-red-500/20',
    subtleBlue: darkMode
      ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
      : 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20',
    subtleTeal: darkMode
      ? 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
      : 'bg-teal-500/10 text-teal-700 hover:bg-teal-500/20',
    subtleOrange: darkMode
      ? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
      : 'bg-orange-500/10 text-orange-700 hover:bg-orange-500/20',
    flatPrimary: 'border border-[#cf1026] bg-[#cf1026] text-white hover:bg-[#ad0b1d]',
    actionClear: darkMode
      ? 'border border-[#573129] bg-[#3b231d] text-[#ffb39e] hover:bg-[#4a2b22]'
      : 'border border-[#e8c1b5] bg-white text-[#cf1026] hover:bg-[#fff1f3] hover:text-[#ad0b1d]',
    actionPreview: darkMode
      ? 'border border-white/10 bg-[#171b22] text-[#d4d8df] hover:bg-[#202631]'
      : 'border border-[#d8dee7] bg-white text-[#111827] hover:bg-[#f8f9fb]',
    actionExcel: darkMode
      ? 'border border-[#22462f] bg-[#16281d] text-[#80d29f] hover:bg-[#1b3525]'
      : 'border border-[#b9dec7] bg-white text-[#0f8a45] hover:bg-[#e9f7ef]',
    actionHtml: darkMode
      ? 'border border-white/10 bg-[#171b22] text-[#d4d8df] hover:bg-[#202631]'
      : 'border border-[#d8dee7] bg-white text-[#111827] hover:bg-[#f8f9fb]',
    actionPdf: darkMode
      ? 'border border-[#5c2730] bg-[#341b20] text-[#ff9ea9] hover:bg-[#421f26]'
      : 'border border-[#e8aeb6] bg-white text-[#cf1026] hover:bg-[#fff1f3]',
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
      ? 'border border-white/10 bg-[#303744] text-white hover:bg-[#3a4352]'
      : 'border border-[#cfd5df] bg-white text-[#111827] hover:bg-[#f8f9fb]',
    iconDanger: 'text-red-600 hover:text-red-800'
  };

  return variants[variant] || variants.primary;
}

export function buttonClasses({ darkMode, variant = 'primary', size = 'md' }) {
  return cx(
    'inline-flex min-w-0 items-center justify-center gap-1.5 transition-colors font-medium disabled:cursor-not-allowed disabled:opacity-50',
    buttonSizes[size],
    buttonVariantClasses(variant, darkMode)
  );
}

export function freightNoticeClasses(darkMode) {
  return darkMode
    ? 'bg-yellow-500/20 border-yellow-500/40'
    : 'bg-yellow-100/80 border-yellow-300/50';
}

export function tableHeaderClasses() {
  return 'text-white';
}

export function tableWrapClasses(darkMode) {
  return cx(
    'w-full max-w-full overflow-auto rounded-[3px] border shadow-none',
    darkMode ? 'border-white/10 bg-[#10141b]' : 'border-[#d8dee7] bg-white'
  );
}

export function productTableClasses() {
  return 'w-full min-w-[1080px] border-separate border-spacing-0 text-[0.74rem]';
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
    'sticky top-0 z-10 whitespace-nowrap border-b border-r px-[7px] py-[6px] align-middle text-[0.62rem] font-bold leading-tight last:border-r-0',
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
    'border-b border-r px-[5px] py-px align-middle last:border-r-0 transition-colors',
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
    'border-r border-t px-[5px] py-[4px] align-middle text-[0.74rem] font-bold last:border-r-0',
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
    'fixed inset-0 z-50 grid place-items-center overflow-y-auto p-3 backdrop-blur-none sm:p-5',
    darkMode ? 'bg-[#05070b]/75' : 'bg-[#0f1218]/55'
  );
}

export function modalPanelClasses(darkMode) {
  return darkMode
    ? 'border border-white/10 bg-[#171b22] text-[#f5f7fa] shadow-none'
    : 'border border-[#cfd5df] bg-white text-[#111827] shadow-none';
}

export function modalHeaderClasses() {
  return 'bg-[#cf1026] text-white';
}

export function modalFooterClasses(darkMode) {
  return darkMode
    ? 'border-white/10 bg-[#202631]'
    : 'border-[#e2e6ec] bg-[#f8f9fb]';
}
