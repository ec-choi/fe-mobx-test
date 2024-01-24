/** @jsxImportSource @emotion/react */
import { Property } from 'csstype'
import { SpacingKeyType } from '../../styles/style'
import { S } from './FlexBox.style'
import { DefaultProps } from '../../types/style/props'

export type FlexBoxProps = {
  direction?: Property.FlexDirection
  gap?: SpacingKeyType
  items?: Property.AlignItems
  justify?: Property.JustifyContent
} & DefaultProps

export default function FlexBox({
  direction = 'row',
  gap = 'sm',
  items = 'center',
  justify = 'space-between',
  children,
  className,
}: FlexBoxProps) {
  return (
    <div css={[S({ direction, gap, items, justify })]} className={className}>
      {children}
    </div>
  )
}
