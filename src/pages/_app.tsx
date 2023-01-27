import { Fragment, ReactNode } from 'react'
import { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SessionProvider } from 'next-auth/react'

import lightTheme from '@theme/lightTheme'
import Layout from '@component/Layout'

import '../styles/globals.css'
import '@fontsource/noto-sans-thai/300.css'
import '@fontsource/noto-sans-thai/400.css'
import '@fontsource/noto-sans-thai/500.css'
import '@fontsource/noto-sans-thai/700.css'

import { trpc } from 'utils/trpc'
import createEmotionCache from 'utils/createEmotionCache'
import UserMachineProvider from '@component/Context/Auth/provider'

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
	pageProps: { session, ...pageProps },
	router,
}: MUIAppProps) => {
	const LayoutWrapper = !pageWithoutLayout.includes(router.pathname)
		? Layout
		: Fragment

	return (
		<AppWraper emotionCache={emotionCache}>
			{/* <UserMachineProvider> */}
				<SessionProvider session={session}>
					<LayoutWrapper>
						<CssBaseline />
						<Component {...pageProps} />
					</LayoutWrapper>
				</SessionProvider>
			{/* </UserMachineProvider> */}
		</AppWraper>
	)
}

export default trpc.withTRPC(App)
