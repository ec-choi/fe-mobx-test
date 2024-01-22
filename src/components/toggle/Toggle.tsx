/** @jsxImportSource @emotion/react */
import { MouseEventHandler } from 'react'
import { StyleProps } from '../../types/style/props'
import S from './Toggle.style'

type Props = {
  id?: string
  checked: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
} & StyleProps

export const Toggle = ({ id, checked, onClick, style, className }: Props) => {
  return (
    <button {...{ id, onClick, style, className }}>
      <div css={[S.basic, checked ? S.on : S.off]} />
    </button>
  )
}
