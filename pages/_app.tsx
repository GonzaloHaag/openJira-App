import { UiProvider } from '@/context/Ui'
import { EntradasProvider } from '@/context/entradas'
import { darkTheme, lightTheme } from '@/themes'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return (
    /**Todo lo que este aqui dentro podra usar las funciones y estados que 
      * defini en el UiContext y UiProvider
    Tambien en el EntradasProvider
      */
    <SnackbarProvider maxSnack={ 3 }>
      <EntradasProvider>
        <UiProvider>
          <ThemeProvider theme={darkTheme}> {/*Para usar tema dark*/}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </EntradasProvider>
    </SnackbarProvider>

  )
}
