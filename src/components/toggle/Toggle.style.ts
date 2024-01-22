import { css } from '@emotion/react'
import { color } from '../../styles/style'

const S = {
  basic: css`
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid ${color.gray400};
    border-radius: 16px;
    background-color: ${color.gray100};

    &::after {
      position: absolute;
      width: 20px;
      height: 20px;
      left: -1px;
      top: -1px;
      content: '';
      border-radius: 50%;
    }
  `,

  on: css`
    &::after {
      background-color: ${color.primary};
      transform: translateX(100%);
      transition: all 0.12s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
  `,
  off: css`
    &::after {
      background-color: ${color.gray500};
      transform: translateX(0);
      transition: all 0.12s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
  `,
}

export default S
