/** @jsxImportSource @emotion/react */
import { DetailedHTMLProps } from 'react'
import { RoundedKeyType } from '../../styles/style'
import { DefaultProps } from '../../types/style/props'
import S from './Button.style'

export type ButtonSizeType = 'sm' | 'md'

export type ButtonProps = {
  rounded?: RoundedKeyType
  size?: ButtonSizeType
} & DefaultProps &
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button({ rounded = 'none', size = 'md', children, ...props }: ButtonProps) {
  return (
    <button css={[S({ rounded, size })]} {...props}>
      {children}
    </button>
  )
}
