import '@emotion/react'

export const color = {
  primary: '#57bf94',
  accent: '#ff707d',
  white: '#ffffff',
  black: '#000000',
  gray100: '#fafafa',
  gray200: '#f5f5f5',
  gray400: '#e0e0e0',
  gray500: '#c0c0c0',
  gray600: '#959595',
  gray800: '#5c5c5c',
  gray900: '#4c4c4c',
} as const

export const typography = {
  weight: {
    normal: '400',
    bold: '700',
  },
  size: {
    xxs: '9px',
    xs: '12px',
    sm: '14px',
  },
} as const

export const spacing = {
  none: 0,
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '30px',
} as const

export const shadow = {
  md: '0 2px 6px 0px rgba(0, 0, 0, 0.08)',
} as const

export const rounded = {
  none: 0,
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
} as const

type ColorType = typeof color
type TypographyType = typeof typography
type SpacingType = typeof spacing
type ShadowType = typeof shadow
type RoundedType = typeof rounded

export type ColorKeyType = keyof ColorType
export type TypographyWeightKeyType = keyof TypographyType['weight']
export type TypographySizeKeyType = keyof TypographyType['size']
export type SpacingKeyType = keyof SpacingType
export type ShadowKeyType = keyof ShadowType
export type RoundedKeyType = keyof RoundedType
