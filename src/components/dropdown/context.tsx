import * as React from 'react'

export const DropdownContext = React.createContext<{
  value?: any
  placeholder?: string
  onSelect: (value: string | number, node: React.ReactNode, isOnChange?: boolean) => void
  isOpen: boolean
  setScrollTop: (value: number) => void
} | null>(null)
