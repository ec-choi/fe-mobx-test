import { css } from '@emotion/react'
import { color, rounded, typography } from '../../styles/style'

export const S = css`
  > label {
    display: block;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: ${rounded.full};
    border: 1px solid ${color.gray200};
    background: ${color.white};
    color: ${color.gray800};
    line-height: 40px;
    text-align: center;
    font-size: ${typography.size.sm};
  }
  > input {
    display: none;
  }
  > input:checked + label {
    background: ${color.primary};
    color: ${color.white};
  }
`
