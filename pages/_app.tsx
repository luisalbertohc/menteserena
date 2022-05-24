import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import theme from '@theme';
import NavBar from '@components/navbar';
import Footer from '@components/footer';
import LandingPageNavBar from '@components/landing/Navbar';
import store from '@store/index';
import AuthProvider from '@components/context/AuthContext';

const description =
  'Mantén tu salud mental donde quieras y cuando quieras producto puertorriqueño que actualiza la práctica clínica a los tiempos tecnológicos en los que vivimos. Fomentamos una comunidad que prioriza la salud mental, a la vez que los hace más accesibles, cool y libres de estigma.';

const MyApp = ({ Component, pageProps, err }: AppProps & {err: any}) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Create a client
  const queryClient = new QueryClient();

  const router = useRouter();
  const isLandingPage = router.pathname === '/';
  const isDirectoryPage = router.pathname === '/directory';
  const isPrivacyPolicyPage = router.pathname === '/privacy-policy';
  const isTermsOfServicePage = router.pathname === '/terms-of-service';
  const isOnboarding = router.pathname.includes('onboarding');
  const isLoginPage = router.pathname.includes('/auth/login');
  const isRegisterPage = router.pathname.includes('/auth/register');
  const isResetPasswordPage = router.pathname.includes('/auth/reset-password');
  const isNewPasswordPage = router.pathname.includes('/auth/new-password');

  return (
    <>
      <Head>
        <title>Mente Serena</title>
        <link rel="icon" href="/favicons/menteSerenaLogo.ico" />
        <meta name="description" content={description} />
        <meta name="title" content="Mente Serena" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              {isLandingPage ||
              isDirectoryPage ||
              isPrivacyPolicyPage ||
              isTermsOfServicePage ||
              isLoginPage ||
              isRegisterPage ||
              isResetPasswordPage ||
              isNewPasswordPage ? (
                <LandingPageNavBar />
              ) : (
                <NavBar />
              )}
              <main>
                <Component {...pageProps} err={err}/>
              </main>
              {isOnboarding && <Footer />}
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default MyApp;
