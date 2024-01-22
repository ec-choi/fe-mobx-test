import { color, rounded, typography } from '../../styles/style'
import { ButtonProps, ButtonSizeType } from './Button'
import { RoundedKeyType } from '../../styles/style'

const S = ({
  rounded: $rounded, //
  size: $size,
}: Pick<ButtonProps, 'rounded' | 'size'>) => {
  const baseStyle = `
  border-radius : ${rounded[$rounded as RoundedKeyType]};
  background: ${color.primary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.bold};
  color: ${color.white};
  text-align: center;
  &:disabled {
    color: ${color.gray500};
    background: ${color.gray400};
  }
  `
  const sizeStyle = {
    sm: `
      width: 240px;
      height: 40px;
    `,
    md: `
      width: 100%;
      height: 48px;
    `,
  }

  return [baseStyle, sizeStyle[$size as ButtonSizeType]]
}

export default S
