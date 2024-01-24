import clsx from 'clsx'
import { observer } from 'mobx-react'
import React from 'react'
import S from './Dropdown.style'
import DropdownRender, { DropdownCustomButtonProps, DropdownRenderProps } from './DropdownRender'
import { StyleProps } from '../../types/style/props'
import { color } from '../../styles/style'

type Props = Omit<DropdownRenderProps, 'CustomButton'> & {
  theme?: 'default' | 'rounded'
  buttonClassName?: StyleProps['className']
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  listWidth?: React.CSSProperties['width']
  listHeight?: React.CSSProperties['height']
  placeholder?: string
  guide?: React.ReactNode
} & StyleProps

const {
  theme: { defaultTheme },
} = S

// 통상적으로 사용되는 드랍다운 버튼
const DefaultButton = ({
  value,
  placeholder,
  contents,
  toggleFn,
  isOpen,
  className,
  ...props
}: DropdownCustomButtonProps) => (
  <button
    css={defaultTheme.button}
    onClick={toggleFn}
    data-testid="dropdown-default-button"
    {...props}
    className={clsx(isOpen && 'dropdown-open', className)}
  >
    {value !== undefined ? (
      <span>{contents}</span>
    ) : (
      <span style={{ color: color.gray500 }}>{placeholder}</span>
    )}
    ▼
  </button>
)

const Dropdown = ({
  theme = 'default',
  children,
  height = 40,
  listWidth = '100%',
  listHeight = 314,
  guide,
  className,
  style,
  ...props
}: Props) => {
  return (
    <DropdownRender
      className={className}
      CustomButton={DefaultButton}
      css={[defaultTheme.wrap]}
      style={{ height: `${height}px`, ...style }}
      {...props}
    >
      <div
        css={[defaultTheme.list]}
        className="dropdown-scroll-wrap"
        style={{
          width: listWidth,
          maxHeight: listHeight,
        }}
      >
        {guide && guide}
        {children}
      </div>
    </DropdownRender>
  )
}

Dropdown.displayName = 'Dropdown'

export default observer(Dropdown)
