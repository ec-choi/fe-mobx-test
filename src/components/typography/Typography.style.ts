import { ColorKeyType, color, typography } from '../../styles/style'
import { TypoType, TypographyProps } from './Typography'

const S = ({
  typoType,
  color: $color,
  align,
}: Pick<TypographyProps, 'typoType' | 'color' | 'align'>) => {
  const baseStyle = `
    line-height: 150%;
    letter-spacing: -0.2px;
  `
  const typoStyle = {
    body1: `
      font-size: ${typography.size.sm};
      font-weight: ${typography.weight.normal};
    `,
    body2: `
      font-size: ${typography.size.xs};
      font-weight: ${typography.weight.normal};
    `,
    body3: `
      font-size: ${typography.size.xxs};
      font-weight: ${typography.weight.normal};
    `,
    caption1: `
      font-size: ${typography.size.sm};
      font-weight: ${typography.weight.bold};
    `,
    caption2: `
      font-size: ${typography.size.xs};
      font-weight: ${typography.weight.bold};
    `,
  }

  const alignStyle = `
    text-align: ${align};
  `
  const colorStyle = `
    color: ${color[$color as ColorKeyType]};
  `

  return [baseStyle, typoStyle[typoType as TypoType], alignStyle, colorStyle]
}

export default S
