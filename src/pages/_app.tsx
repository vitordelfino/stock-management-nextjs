import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React, { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { AuthProvider } from '../contexts/auth';
import theme from '../styles/theme';
import DefaultLayout from '../components/DefaultLayout';
import 'aos/dist/aos.css';
import Aos from 'aos';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    Aos.init({
      duration: 600,
    });
  }, []);

  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClientRef.current}>
        <ReactQueryDevtools
          initialIsOpen={process.env.NODE_ENV === 'development'}
        />
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
