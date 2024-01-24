import styled from '@emotion/styled'
import clsx from 'clsx'
import * as React from 'react'
import { useEffect, useRef } from 'react'

import { DropdownContext } from './context'
import { StyleProps } from '../../types/style/props'
import Icon from '../atoms/Icon/Icon'
import { color } from '../../styles/style'

type Props = {
  value: any
  disabled?: boolean
  children?: React.ReactNode
  isChecked?: boolean
} & StyleProps

const DropdownItem = ({ value, disabled = false, children, className, style }: Props) => {
  const ref = useRef<HTMLButtonElement>(null)
  const context = React.useContext(DropdownContext)
  const isActive = value === context?.value

  useEffect(() => {
    if (isActive) {
      context?.onSelect(value, children)
    }
  }, [context?.value])

  useEffect(() => {
    if (isActive) {
      context?.onSelect(value, children)
    }
  }, [children])

  return (
    <button
      disabled={disabled}
      className={clsx(isActive && 'active', className)}
      style={style}
      onClick={() => context?.onSelect(value, children, true)}
      ref={ref}
    >
      {children}
      {isActive && <Icon name="check" className="check-icon" size={20} color={color.gray900} />}
    </button>
  )
}

export default styled(DropdownItem)`
  display: flex;
  align-items: center;
  text-align: left;
  .check-icon {
    margin-left: auto;
    display: none;
  }
`
