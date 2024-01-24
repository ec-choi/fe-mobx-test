/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react'
import * as React from 'react'
import { ChangeEvent, CSSProperties, useEffect, useImperativeHandle, useMemo, useRef } from 'react'

import { S } from './Input.style'
import { REG_EXP } from '../../constants/regExp'

type NumberTypeProps = {
  isShowNumberController?: boolean
}

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  isError: boolean
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  height?: CSSProperties['height']
} & NumberTypeProps

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      height = '40px',
      isError = false,
      style,
      className,
      type,
      onEnter,
      onChange,
      onBlur,
      isShowNumberController = type === 'number',
      min = 0,
      max,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    // forwardRef와 ref 공유
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [ref])

    // type === number 일때 사용되는 이전 값, 핸들러
    const beforeNumberValue = useRef(props.defaultValue ?? props.value ?? '')

    const onNumberChange = useMemo(
      () => (val: string) => {
        if (!inputRef.current) return
        if (REG_EXP.NUMBER.test(val)) {
          if (+val < +min) {
            inputRef.current.value = `${min}`
          } else if (max && +val > +max) {
            inputRef.current.value = `${max}`
          } else {
            beforeNumberValue.current = inputRef.current.value
            inputRef.current.value = val
          }
        } else {
          const beforeCaretEnd = inputRef.current.selectionEnd
          // regexp에 맞지 않으면 이전 값으로 되돌림
          inputRef.current.value = String(beforeNumberValue.current)
          // 커서 움직이지 않게
          if (beforeCaretEnd !== null) inputRef.current.selectionEnd = beforeCaretEnd - 1
        }
        if (/^(-?)(0+)([1-9]\d*)/.test(inputRef.current.value)) {
          inputRef.current.value = String(beforeNumberValue.current).replace(
            /^(-?)(0+)([1-9]\d*)/,
            (_, $1, $2, $3) => `${$1}${$3}`
          )
        }
      },
      []
    )
    const handleNumberChange = useMemo(
      () => (e: ChangeEvent<HTMLInputElement>) => {
        onNumberChange(e.target.value)
        onChange?.(e)
      },
      [onChange]
    )
    // 타입에 따른 onChange 핸들러 분기처리
    const handleChange = useMemo(() => {
      switch (type) {
        case 'number':
          return handleNumberChange
        default:
          return onChange
      }
    }, [type, onChange])

    // 계산된 후 Real input 타입
    const inputType = useMemo(() => {
      switch (type) {
        case 'number':
          return 'text'
        default:
          return type
      }
    }, [type])

    // input이 아닌 input을 감싸고 있는 div를 이용해서 화면 사라짐, 나타남을 표시.
    // window 에서 발생하는 composition 관련 스크롤 이슈를 수정하기 위해서 input을 계속 화면 안에 위치하도록 고정
    const divRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (!divRef.current) return

      const intersectionObserver = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) {
          if (divRef.current) {
            divRef.current.style.height = '40px'
            ;(divRef.current.firstChild as HTMLInputElement).style.position = 'fixed'
            ;(divRef.current.firstChild as HTMLInputElement).style.opacity = '0'
            ;(divRef.current.firstChild as HTMLInputElement).style.zIndex = '-1'
          }
        } else {
          if (divRef.current) {
            divRef.current.style.height = ''
            ;(divRef.current.firstChild as HTMLInputElement).style.position = ''
            ;(divRef.current.firstChild as HTMLInputElement).style.opacity = '1'
            ;(divRef.current.firstChild as HTMLInputElement).style.zIndex = ''
          }
        }
      })
      intersectionObserver.observe(divRef.current)

      return () => intersectionObserver.disconnect()
    }, [])

    return (
      <input
        type={inputType}
        css={[S.input(isError), { height }]}
        ref={inputRef}
        inputMode={type === 'number' ? 'numeric' : undefined}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export default observer(Input)
