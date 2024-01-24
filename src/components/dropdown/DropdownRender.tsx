/** @jsxImportSource @emotion/react */
import clsx from 'clsx'
import { Observer, useLocalObservable } from 'mobx-react'
import { MouseEvent, ReactNode, RefObject, useEffect, useRef } from 'react'

import { DropdownContext } from './context'
import S from './Dropdown.style'
import { StyleProps } from '../../types/style/props'

export type DropdownCustomButtonProps = {
  value: any
  placeholder?: string
  contents?: ReactNode
  toggleFn: (e: MouseEvent) => void
  isOpen: boolean
  disabled?: boolean
  className?: StyleProps['className']
  ref: RefObject<HTMLButtonElement>
}

export type DropdownRenderProps = {
  CustomButton: (props: DropdownCustomButtonProps) => ReactNode
  onChange?: (value: any) => void
  value?: any
  placeholder?: string
  width?: number
  children?: React.ReactNode
  disabled?: boolean
  buttonClassName?: StyleProps['className']
} & StyleProps

const _DropdownRender = ({
  buttonClassName,
  onChange,
  width,
  className,
  value,
  placeholder,
  children,
  CustomButton,
  style,
  disabled,
  ...props
}: DropdownRenderProps) => {
  const store = useLocalObservable(() => {
    return {
      selectedNode: undefined as undefined | ReactNode,
      isOpen: false,
      toggle() {
        if (disabled) return
        store.isOpen ? store.close() : store.open()
      },
      open() {
        store.isOpen = true

        requestAnimationFrame(() => {
          if (listRef.current) {
            const scrollEl = listRef.current.querySelector<HTMLDivElement>('.dropdown-scroll-wrap')
            const activeEl = listRef.current.querySelector<HTMLButtonElement>('.active')

            if (scrollEl && activeEl) {
              const scrollActiveItemCenter =
                activeEl.offsetTop - scrollEl.offsetHeight / 2 + activeEl.offsetHeight / 2

              scrollEl.scrollTop = scrollActiveItemCenter
            }
          }
        })
      },
      close() {
        store.isOpen = false
      },
      onDropdownSelect(newValue: string | number, node: React.ReactNode, isOnChange = false) {
        if (value !== newValue) {
          value = newValue
          if (isOnChange) onChange?.(value)
        }
        if (node !== undefined) store.selectedNode = node
      },
      setScrollTop(v: number) {
        if (listRef.current) {
          // TODO: scroll 이동 넣기
          listRef.current.scrollTop = v
        }
      },
    }
  })

  const dropDownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        store.close()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', (e) => handleClickOutside(e))
    }
  }, [])

  return (
    <Observer>
      {() => (
        <DropdownContext.Provider
          value={{
            value,
            placeholder,
            onSelect: store.onDropdownSelect,
            isOpen: store.isOpen,
            setScrollTop: store.setScrollTop,
          }}
        >
          <div
            css={[S.basic.wrapper]}
            style={{ width: width ? `${width}px` : 'auto', ...style }}
            className={className}
            ref={dropDownRef}
            {...props}
          >
            {CustomButton({
              value,
              placeholder,
              contents: store.selectedNode,
              toggleFn: () => {
                store.toggle()
              },
              disabled,
              isOpen: store.isOpen,
              className: buttonClassName,
              ref: buttonRef,
            })}
            <div className={clsx('__dropdown-list', store.isOpen && 'open')} ref={listRef}>
              {children}
            </div>
          </div>
        </DropdownContext.Provider>
      )}
    </Observer>
  )
}

_DropdownRender.displayName = 'DropdownRender'

const DropdownRender = _DropdownRender

export default DropdownRender
