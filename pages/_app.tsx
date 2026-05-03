import '@/styles/globals.css';
import '@/styles/components/cylinder-posters.css';
import '@/styles/components/caustics-glass.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { LanguageProvider } from '@/contexts/LanguageContext';
import StoreProvider from '@/store/StoreProvider';
import { metadata } from '@/lib/metadata';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Optimize fonts with next/font to eliminate layout shifts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div className={`${inter.variable} font-sans`}>
        <LanguageProvider>
          <PerformanceMonitor />
      <Head>
        {/* Performance: Preconnect to critical CDNs */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add your CDN domain here when configured */}
        {/* <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" /> */}
        
        {/* Performance: DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Sitewide Meta Tags */}
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={metadata.siteUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.siteUrl} />
        <meta property="og:title" content={metadata.title.default} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={metadata.siteUrl} />
        <meta name="twitter:title" content={metadata.title.default} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.ogImage} />
      </Head>
      
      {/* Organization JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Oakroot Solutions',
            url: 'https://oakrootsolutions.com/',
            slogan: 'SECURE. SCALABLE. SOVEREIGN.',
            logo: 'https://oakrootsolutions.com/logo.png',
            '@id': 'https://oakrootsolutions.com/',
            sameAs: [
              'https://linkedin.com/company/oakroot-solutions',
              'https://twitter.com/oakrootsolutions',
              'https://instagram.com/oakrootsolutions',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+919202212290',
              contactType: 'Customer Service',
            },
          }),
        }}
      />
      
      {/* LocalBusiness JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Oakroot Solutions',
            image: 'https://oakrootsolutions.com/logo.png',
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
      
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LanguageProvider>
      </div>
    </StoreProvider>
  );
}

