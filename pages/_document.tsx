import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // Organization Schema Markup for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Oakroot Solutions",
    "url": "https://oakrootsolutions.com",
    "logo": "https://oakrootsolutions.com/logo.png",
    "description": "Elevating brands through creative strategy and conversion-focused marketing. Oakroot Solutions is your all-in-one digital partner for growth.",
    "sameAs": [
      "https://www.linkedin.com/company/oakroot-solutions",
      "https://www.instagram.com/oakrootsolutions",
      "https://twitter.com/oakrootsolutions",
      "https://www.facebook.com/oakrootsolutions"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9202212290",
      "contactType": "customer service",
      "areaServed": ["IN", "US", "CA", "AE", "SG", "GB"],
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    }
  };

  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon/O (2).png" type="image/png" />
        <link rel="shortcut icon" href="/favicon/O (2).png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/O (2).png" />
        
        {/* Organization Schema Markup for Technical SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

