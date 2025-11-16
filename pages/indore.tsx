import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticProps() {
  return {
    props: {},
    // ISR: Revalidate every hour (3600 seconds)
    revalidate: 3600,
  };
}

export default function IndorePage() {
  return (
    <>
      <Head>
        <title>Oakroot Solutions - Indore Web Design & AI Automation</title>
        <meta
          name="description"
          content="Leading web design and AI automation services in Indore. Oakroot Solutions provides creative strategy, development, and digital marketing solutions for Indore businesses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* LocalBusiness Schema for Indore */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Oakroot Solutions - Indore',
              image: 'https://oakrootsolutions.com/logo-url.png',
              '@id': 'https://oakrootsolutions.com/indore',
              url: 'https://oakrootsolutions.com/indore',
              telephone: '+919202212290',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'DAVV Incubation Centre IT Park',
                addressLocality: 'Indore',
                addressRegion: 'MP',
                postalCode: '452020',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '22.7196',
                longitude: '75.8567',
              },
              areaServed: {
                '@type': 'City',
                name: 'Indore',
              },
            }),
          }}
        />
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">
            Web Design & AI Automation in Indore
          </h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Oakroot Solutions is Indore&apos;s premier digital agency, specializing in web design, 
            AI automation, and conversion-focused marketing. Located at DAVV Incubation Centre IT Park, 
            we help Indore businesses elevate their digital presence.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop"
            alt="Oakroot Solutions Office in Indore"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Services Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Our Services in Indore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/web-design" className="hover:underline">
                  Web Design
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Custom, responsive websites designed for Indore businesses. We create digital experiences 
                that convert visitors into customers.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/digital-marketing" className="hover:underline">
                  Digital Marketing
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Local SEO, social media marketing, and conversion-focused campaigns to help your 
                Indore business grow online.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/branding" className="hover:underline">
                  Branding
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Complete brand identity solutions for Indore businesses. From logo design to brand 
                strategy, we help you stand out.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/app-development" className="hover:underline">
                  AI Automations
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Intelligent AI solutions to streamline operations for Indore businesses. Automate 
                workflows and boost productivity.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/app-development" className="hover:underline">
                  App Development
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Custom mobile and web applications built for Indore businesses. Scalable solutions 
                that grow with you.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/graphic-design" className="hover:underline">
                  Graphic Design
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Professional graphic design services for Indore businesses. Print and digital 
                designs that make an impact.
              </p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Visit Our Indore Office</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">DAVV Incubation Centre IT Park</h3>
              <p className="text-base lg:text-lg text-neutral-600 mb-4 whitespace-pre-line">
                DAVV Incubation Centre{'\n'}
                IT Park Indore{'\n'}
                MP 452020{'\n'}
                India
              </p>
              <p className="text-base lg:text-lg text-neutral-600 mb-4">
                <strong>Phone:</strong>{' '}
                <a href="tel:+919202212290" className="underline hover:text-gray-800">
                  +91 9202212290
                </a>
              </p>
              <p className="text-base lg:text-lg text-neutral-600 mb-6">
                <strong>Email:</strong>{' '}
                <a href="mailto:info@oakrootsolutions.com" className="underline hover:text-gray-800">
                  info@oakrootsolutions.com
                </a>
              </p>
              <Link
                href="/contact"
                className="inline-block bg-black text-white font-semibold rounded-full py-3 px-6 lg:px-8 hover:bg-gray-800 transition-colors text-sm lg:text-base"
              >
                Get Directions
              </Link>
            </div>
            <div className="w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.1234567890123!2d75.8567!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEwLjYiTiA3NcKwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Oakroot Solutions Location in Indore"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto bg-black text-white rounded-lg p-6 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">
            Ready to Grow Your Indore Business?
          </h2>
          <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
            Let&apos;s discuss how we can help elevate your digital presence and drive growth 
            for your Indore business.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-semibold rounded-full py-2.5 px-6 lg:py-3 lg:px-8 hover:bg-neutral-100 transition-colors text-sm lg:text-base"
          >
            Schedule a Consultation
          </Link>
        </div>
      </main>
    </>
  );
}

