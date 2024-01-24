import { css } from '@emotion/react'
import { color, typography } from '../../styles/style'

export const S = {
  input: (isError: boolean) => {
    return [
      css`
        position: relative;
        width: 20%;
        padding: 0 12px;
        border-radius: 4px;
        border: 1px solid ${isError ? color.accent : color.gray400};
        outline: none;
        color: ${color.gray900};
        -webkit-appearance: none; //아이패드 기본 input 스타일 삭제
        &::placeholder {
          font-size: ${typography.size.sm};
          color: ${color.gray500};
        }
        &:disabled {
          color: ${color.gray500};
          background: ${color.gray100};
          border: 1px solid ${color.gray200};
        }
        &[inputmode='numeric'] {
          text-align: center;
        }
      `,
    ]
  },
  wrapper: css`
    position: relative;
    flex: 1;
  `,
}
