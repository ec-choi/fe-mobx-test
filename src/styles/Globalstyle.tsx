import { css, Global } from '@emotion/react'
import { resetCSS } from './reset'

const style = css`
  ${resetCSS}
`

function GlobalStyle() {
  return <Global styles={style} />
}

export default GlobalStyle
