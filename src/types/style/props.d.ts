import * as React from 'react'

export type DefaultProps = {
  children?: React.ReactNode
} & StyleProps

export type StyleProps = {
  className?: string
  style?: React.CSSProperties
}

export interface HtmlElementProps<T extends HTMLElement>
  extends Omit<React.HTMLAttributes<T>, 'id'> {
  'data-testid'?: string
}
