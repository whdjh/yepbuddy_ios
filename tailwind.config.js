/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {

      // ═══ L1: Primitive Colors ═══
      colors: {
        cream:   { 50: '#FAF7F2', 100: '#F5EFE6', 200: '#EDE4D6', 300: '#E8DFD0', 400: '#DDD2BF' },
        sand:    { 50: '#F2EBDD', 200: '#D9C99A', 300: '#C4A87E', 400: '#B59768' },
        khaki:   { 300: '#9B7E56', 400: '#876B45' },
        olive:   { 200: '#7B6548', 300: '#6B5638', 400: '#5A472D' },
        earth:   { 200: '#4A3A28', 300: '#3A2A1A', 400: '#2A1E12', 500: '#1A120A' },
        success: { 50: '#D6F0D6', 500: '#4A8C4A', 700: '#2E5A2E' },
        info:    { 50: '#D6E8F0', 700: '#1A4A5E' },
        error:   { 50: '#FDDDD6', 500: '#C0392B', 600: '#FF6B5A', 700: '#7A2419' },

        // ═══ L2: Semantic Colors ═══
        yb: {
          bg:              'var(--yb-bg)',
          surface:         'var(--yb-surface)',
          'surface-subtle':'var(--yb-surface-subtle)',
          'surface-muted': 'var(--yb-surface-muted)',
          'fill-pale':     'var(--yb-fill-pale)',
          'fill-strong':   'var(--yb-fill-strong)',
          fg:              'var(--yb-fg)',
          'fg-secondary':  'var(--yb-fg-secondary)',
          'fg-tertiary':   'var(--yb-fg-tertiary)',
          'fg-disabled':   'var(--yb-fg-disabled)',
          accent:          'var(--yb-accent)',
          'accent-hover':  'var(--yb-accent-hover)',
          border:          'var(--yb-border)',
          'border-subtle': 'var(--yb-border-subtle)',
          'border-strong': 'var(--yb-border-strong)',
          'on-accent':     'var(--yb-on-accent)',
          'on-strong':     'var(--yb-on-strong)',
        },
      },

      // ═══ L1: Font Family ═══
      fontFamily: {
        yb: ['Pretendard Variable', 'Pretendard', 'System'],
      },

      // ═══ L1: Font Size → L2: Typography Scale ═══
      fontSize: {
        'yb-caption':    ['12px', { lineHeight: '1.3', fontWeight: '500' }],
        'yb-label':      ['13px', { lineHeight: '1.2', fontWeight: '600' }],
        'yb-body-sm':    ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'yb-body-md':    ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'yb-body-lg':    ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'yb-title':      ['18px', { lineHeight: '1.4', fontWeight: '700' }],
        'yb-heading-sm': ['20px', { lineHeight: '1.35', fontWeight: '700' }],
        'yb-heading-md': ['22px', { lineHeight: '1.3', fontWeight: '700' }],
        'yb-heading-lg': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'yb-display':    ['30px', { lineHeight: '1.25', fontWeight: '700' }],
        'yb-num-xs':     ['22px', { lineHeight: '1', fontWeight: '700' }],
        'yb-num-sm':     ['24px', { lineHeight: '1', fontWeight: '700' }],
        'yb-num-md':     ['32px', { lineHeight: '1', fontWeight: '700' }],
        'yb-num-lg':     ['40px', { lineHeight: '1', fontWeight: '700' }],
        'yb-num-xl':     ['72px', { lineHeight: '1', fontWeight: '700' }],
        'yb-num-2xl':    ['96px', { lineHeight: '1', fontWeight: '700' }],
      },

      // ═══ L1: Letter Spacing ═══
      letterSpacing: {
        'yb-tight': '-0.03em',
      },

      // ═══ L1: Spacing (4px base) ═══
      spacing: {
        'yb-0.5': '2px',
        'yb-1':   '4px',
        'yb-1.5': '6px',
        'yb-2':   '8px',
        'yb-2.5': '10px',
        'yb-3':   '12px',
        'yb-3.5': '14px',
        'yb-4':   '16px',
        'yb-5':   '20px',
        'yb-6':   '24px',
        'yb-8':   '32px',
        'yb-9':   '36px',
        'yb-10':  '40px',
        'yb-12':  '48px',
      },

      // ═══ L1: Border Radius (outer = inner × 2) ═══
      borderRadius: {
        'yb-sm':     '8px',   // card-inner, icon-box
        'yb-md':     '10px',  // segment-inner
        'yb-icon':   '12px',  // icon-btn, segment-outer
        'yb-lg':     '14px',  // button, input
        'yb-xl':     '16px',  // card-outer
        'yb-drawer': '20px',  // drawer
        'yb-chip':   '22px',  // chip
      },

      // ═══ L3: Component Sizes ═══
      height: {
        'yb-touch':      '44px',
        'yb-btn-sm':     '44px',
        'yb-btn-md':     '52px',
        'yb-chip':       '44px',
        'yb-input':      '48px',
        'yb-num-input':  '56px',
        'yb-drawer-btn': '56px',
        'yb-drawer-lg':  '64px',
      },
      width: {
        'yb-icon-sm':  '44px',
        'yb-icon-md':  '48px',
        'yb-icon-lg':  '56px',
        'yb-num-input':'100px',
      },
      minHeight: {
        'yb-touch': '44px',
      },

      // ═══ L1: Shadows ═══
      boxShadow: {
        'yb-sm': '0 1px 3px rgba(58,42,26,0.08), 0 1px 2px rgba(58,42,26,0.04)',
        'yb-md': '0 4px 6px rgba(58,42,26,0.06), 0 2px 4px rgba(58,42,26,0.04)',
        'yb-lg': '0 10px 25px rgba(58,42,26,0.15)',
      },

      // ═══ L1: Border Width ═══
      borderWidth: {
        'yb':      '1px',
        'yb-input':'1.5px',
        'yb-icon': '1.5px',
      },
    },
  },
  plugins: [],
};