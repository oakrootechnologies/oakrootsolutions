import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import Preloader from '@/components/Preloader';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Preloader />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  );
}

