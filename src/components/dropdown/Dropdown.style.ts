import DropdownItem from './DropdownItem'
import { color, shadow, typography } from '../../styles/style'
import { css } from '@emotion/react'

const S = {
  basic: {
    wrapper: css`
      position: relative;

      .__dropdown-list {
        display: none;
      }
      .__dropdown-list.open {
        display: block;
      }
    `,
    dropdownButton: css`
      width: 100%;
      height: 100%;
    `,
    dropdownList: css`
      top: 100%;
      z-index: 1;
    `,
    hiddenResult: css`
      position: absolute;
      visibility: hidden;
      z-index: -1;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
    `,
  },
  theme: {
    defaultTheme: {
      wrap: css`
        .dropdown_item {
          width: 100%;
          padding: 0 12px;
          min-height: 48px;
          border-bottom: 1px solid ${color.gray400};
          color: ${color.gray900};

          &.active {
            .check-icon {
              display: inline-block;
            }
          }
          &:hover:enabled {
            background-color: ${color.gray100};
          }
          &:disabled {
            color: ${color.gray500};
            cursor: not-allowed;
          }
          &:last-child {
            border-bottom: 0 none;
          }
        }
      `,
      list: css`
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: calc(100% + 4px);
        right: 0;
        max-height: 314px;
        z-index: 1;

        overflow: scroll;

        border: 1px solid ${color.gray400};
        border-radius: 4px;
        background: white;
        scrollbar-width: none;
        -webkit-scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      `,
      button: css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 100%;
        width: 100%;
        padding-left: 12px;
        padding-right: 8px;

        border: 1px solid ${color.gray400};
        border-radius: 4px;
        background-color: white;

        path {
          fill: ${color.gray500};
        }

        &.dropdown-open path {
          fill: ${color.gray600};
        }

        &:disabled {
          background-color: ${color.gray100};
          color: ${color.gray500};
        }
        > span {
          text-align: left;
        }
      `,
    },

    rounded: {
      wrap: css`
        height: 56px;

        .dropdown_item {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-height: 48px;
          color: ${color.gray800};

          &:hover {
            background-color: ${color.gray100};
          }
          &.active {
            background-color: ${color.gray100};
            color: ${color.gray900};

            .check-icon {
              display: block;
              position: absolute;
              right: 12px;
            }
          }
        }
      `,
      button: css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        > strong {
          font-weight: 500;
          margin-right: 8px;
          ${typography.size.xs};
        }
        &:disabled {
          cursor: not-allowed;
          background-color: ${color.gray100};
        }
      `,
      list: css`
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        left: 8px;
        top: 100%;
        z-index: 1;

        width: calc(100% - 16px);
        max-height: 314px;
        margin-top: 8px;
        overflow: scroll;
        border-radius: 8px;
        box-shadow: ${shadow.md};
        background: white;
        scrollbar-width: none;
        -webkit-scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      `,
    },
  },
}

export default S
