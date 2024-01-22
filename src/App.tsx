import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import GlobalStyle from './styles/Globalstyle'
import { ThemeProvider } from '@emotion/react'

const App = () => {
  return (
    <>
      {/* <GlobalStyle /> */}
      {/* <ThemeProvider theme={theme}> */}
        <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </>
  )
}

export default App
