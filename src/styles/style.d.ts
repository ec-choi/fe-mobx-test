import '@emotion/react'

const color = {
  primary: '#57bf94',
  white: '#ffffff',
  black: '#000000',
  gray100: '#fafafa',
  gray200: '#f5f5f5',
  gray400: '#e0e0e0',
  gray600: '#959595',
  gray800: '#5c5c5c',
  gray900: '#333333',
} as const

const typography = {
  weight: {
    normal: '400',
    bold: '700',
  },
  size: {
    xxs: '9px',
    xs: '12px',
    sm: '14px',
    // md: '16px',
    // lg: '18px',
    // xl: '20px',
  },
} as const

const spacing = {
  none: 0,
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '30px',
} as const

const shadow = {
  md: '0 2px 6px 0px rgba(0, 0, 0, 0.08)',
} as const

const rounded = {
  none: 0,
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
} as const

// declare module '@emotion/react' {
//   interface Theme {
//     color: {
//       primary: string
//     }
//     dark: {
//       primary: string
//     }
//   }
// }
