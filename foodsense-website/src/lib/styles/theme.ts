export const theme = {
  colors: {
    primary: {
      DEFAULT: '#f1c100', // Yellow brand color
      50: '#fff9e5',
      100: '#ffefb8',
      200: '#ffe48a',
      300: '#ffd95c',
      400: '#ffcd2e',
      500: '#f1c100',
      600: '#cc9f00',
      700: '#a67d00',
      800: '#805b00',
      900: '#5a3900'
    },
    secondary: {
      DEFAULT: '#253b59', // Blue brand color
      50: '#f0f4f8',
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#253b59',
      600: '#1e2f47',
      700: '#172435',
      800: '#0f1824',
      900: '#080c12'
    },
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    semantic: {
      success: {
        DEFAULT: '#16a34a',
        light: '#dcfce7',
        dark: '#166534'
      },
      error: {
        DEFAULT: '#dc2626',
        light: '#fee2e2',
        dark: '#991b1b'
      },
      warning: {
        DEFAULT: '#ea580c',
        light: '#ffedd5',
        dark: '#9a3412'
      }
    }
  },
  spacing: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      maxWidth: '1280px'
    }
  },
  typography: {
    fontFamily: {
      sans: ['var(--font-inter)'],
      mono: ['var(--font-mono)']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }]
    }
  }
}; 