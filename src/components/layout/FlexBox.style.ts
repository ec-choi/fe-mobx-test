import { css } from '@emotion/react'
import { spacing, SpacingKeyType } from '../../styles/style'
import { FlexBoxProps } from './FlexBox'

export const S = ({ direction, gap, items, justify }: Omit<FlexBoxProps, 'children'>) => {
  return [
    css`
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
      align-items: ${items};
      gap: ${spacing[gap as SpacingKeyType]};
    `,
  ]
}
