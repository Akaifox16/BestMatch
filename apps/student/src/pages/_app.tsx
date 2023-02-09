import { Fragment, type ReactNode } from 'react';
import { type AppProps } from 'next/app';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

import { theme } from '@acme/theme';
import Layout from '@component/Layout';

import '../styles/globals.css';
import '@fontsource/noto-sans-thai/300.css';
import '@fontsource/noto-sans-thai/400.css';
import '@fontsource/noto-sans-thai/500.css';
import '@fontsource/noto-sans-thai/700.css';

import { trpc } from 'utils/trpc';
import createEmotionCache from 'utils/createEmotionCache';

interface MUIAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type ParentNode = {
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

const pageWithoutLayout = ['/login', '/register'];

const AppWrapper = ({
  children,
  emotionCache,
}: ParentNode & {
  emotionCache: EmotionCache;
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
  router,
}: MUIAppProps) => {
  const LayoutWrapper = !pageWithoutLayout.includes(router.pathname)
    ? Layout
    : Fragment;

  return (
    <AppWrapper emotionCache={emotionCache}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <SessionProvider session={session}>
        <LayoutWrapper>
          <CssBaseline />
          <Component {...pageProps} />
        </LayoutWrapper>
      </SessionProvider>
    </AppWrapper>
  );
};

export default trpc.withTRPC(App);
