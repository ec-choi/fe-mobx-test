/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react'
import { DefaultProps } from '../../types/style/props'
import Typography from '../typography/Typography'
import S from './Header.style'

type HeaderProps = {
  title: string
  leftButton?: ReactNode
  rightButton?: ReactNode
} & DefaultProps
export const Header = ({ title, leftButton, rightButton }: HeaderProps) => {
  return (
    <header css={[S]}>
      {leftButton ? leftButton : <div></div>}
      <Typography as="h1" typoType="caption2">
        {title}
      </Typography>
      {rightButton ? rightButton : <div></div>}
    </header>
  )
}
