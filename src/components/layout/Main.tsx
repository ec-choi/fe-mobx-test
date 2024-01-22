/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react'
import { DefaultProps } from '../../types/style/props'
import S from './Main.style'

type A = {
  css?: SerializedStyles
} & DefaultProps
export const Main = ({ children, css, ...props }: A) => {
  return (
    <main css={[S, css]} {...props}>
      {children}
    </main>
  )
}
