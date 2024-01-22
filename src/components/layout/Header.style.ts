import { css } from '@emotion/react'
import { color, spacing } from '../../styles/style'

const S = css`
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: ${spacing.lg};
  background: ${color.gray900};
  button {
    color: ${color.white};
  }
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: ${color.white};
  }
`

export default S
