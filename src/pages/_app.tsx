import '../styles/globals.css'
import createEmotionCache from '@utility/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import lightTheme from '@theme/lightTheme'
import { AppProps } from 'next/app'
import Layout from '@component/Layout'
import { trpc } from '@utility/trpc'
import { Fragment, ReactNode } from 'react'

interface MUIAppProps extends AppProps {
	emotionCache?: EmotionCache
}

type ParentNode = {
	children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

const pageWithoutLayout = ['/login', '/register']

const AppWraper = ({
	children,
	emotionCache,
}: ParentNode & {
	emotionCache: EmotionCache
}) => {
	return (
		<CacheProvider value={emotionCache!}>
			<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
		</CacheProvider>
	)
}

const App = ({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
	router,
}: MUIAppProps) => {
	const LayoutWrapper = !pageWithoutLayout.includes(router.pathname)
		? Layout
		: Fragment

	return (
		<AppWraper emotionCache={emotionCache}>
			<LayoutWrapper>
				<CssBaseline />
				<Component {...pageProps} />
			</LayoutWrapper>
		</AppWraper>
	)
}

export default trpc.withTRPC(App)
