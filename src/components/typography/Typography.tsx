/** @jsxImportSource @emotion/react */
import { ElementType, memo } from 'react'
import { DefaultProps } from '../../types/style/props'
import { ColorKeyType } from '../../styles/style'
import S from './Typography.style'

export type TypoType = 'body1' | 'body2' | 'body3' | 'caption1' | 'caption2'

export type TypographyProps = {
  as?: ElementType
  typoType?: TypoType
  color?: ColorKeyType
  align?: 'left' | 'right' | 'center'
} & DefaultProps

export default memo(function Typography({
  as,
  typoType = 'body1',
  align = 'left',
  color = 'gray900',
  children,
  className = '',
}: TypographyProps) {
  const Component = as || 'span'

  return (
    <Component css={S({ typoType, color, align })} className={`${typoType} ${className}`}>
      {children}
    </Component>
  )
})
