/** @jsxImportSource @emotion/react */
import { InputHTMLAttributes, forwardRef } from 'react'
import { DefaultProps } from '../../types/style/props'
import { S } from './ChangeInputWithRoundLabel.style'

type ChangeInputWithRoundLabelProps = {
  labelText: string
  type: 'radio' | 'checkbox'
} & DefaultProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
export const ChangeInputWithRoundLabel = forwardRef(
  ({ labelText, ...props }: ChangeInputWithRoundLabelProps, ref) => {
    return (
      <div css={[S]}>
        <input {...props} />
        <label htmlFor={props.id}>{labelText}</label>
      </div>
    )
  }
)
