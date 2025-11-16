import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import Preloader from '@/components/Preloader';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Optimize fonts with next/font to eliminate layout shifts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.variable}>
      <LanguageProvider>
      <Head>
        {/* Sitewide Meta Tags */}
        <title>Oakroot Solutions - Digital Growth Engine</title>
        <meta
          name="description"
          content="As your all-in-one digital partner, Oakroot Solutions combines creative strategy, development, and AI to elevate brands and drive conversion-focused growth."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://oakrootsolutions.com/" />
        <meta property="og:title" content="Oakroot Solutions - Digital Growth Engine" />
        <meta
          property="og:description"
          content="As your all-in-one digital partner, Oakroot Solutions combines creative strategy, development, and AI to elevate brands and drive conversion-focused growth."
        />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://oakrootsolutions.com/" />
        <meta property="twitter:title" content="Oakroot Solutions - Digital Growth Engine" />
        <meta
          property="twitter:description"
          content="As your all-in-one digital partner, Oakroot Solutions combines creative strategy, development, and AI to elevate brands and drive conversion-focused growth."
        />
      </Head>
      
      {/* LocalBusiness JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Oakroot Solutions',
            image: 'https://oakrootsolutions.com/logo-url.png',
            '@id': 'https://oakrootsolutions.com/',
            url: 'https://oakrootsolutions.com/',
            telephone: '+919202212290',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'DAVV Incubation Centre IT Park',
              addressLocality: 'Indore',
              addressRegion: 'MP',
              postalCode: '452020',
              addressCountry: 'IN',
            },
            sameAs: [
              'https://linkedin.com/company/oakroot-solutions',
              'https://twitter.com/oakrootsolutions',
              'https://instagram.com/oakrootsolutions',
            ],
          }),
        }}
      />
      
      <Preloader />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
    </div>
  );
}

