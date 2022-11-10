import '../styles/globals.css'
import createEmotionCache from '@utility/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import lightTheme from '@theme/lightTheme'
import { AppProps } from 'next/app'
import Layout from '@component/Layout'
import { trpc } from '@utility/trpc'

interface MUIAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MUIAppProps) => {
  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <Layout>
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    )
}

export default trpc.withTRPC(App)