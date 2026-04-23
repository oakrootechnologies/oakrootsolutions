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

export default function DubaiPage() {
  return (
    <>
      <Head>
        <title>Oakroot Solutions - Dubai Web Design & Digital Solutions</title>
        <meta
          name="description"
          content="Premium web design and digital solutions in Dubai, UAE. Oakroot Solutions provides creative strategy, development, and digital marketing for Dubai businesses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* LocalBusiness Schema for Dubai */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Oakroot Solutions - Dubai',
              image: 'https://oakrootsolutions.com/logo.png',
              '@id': 'https://oakrootsolutions.com/dubai-web-design',
              url: 'https://oakrootsolutions.com/dubai-web-design',
              telephone: '+919202212290',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dubai',
                addressRegion: 'Dubai',
                addressCountry: 'AE',
              },
              areaServed: {
                '@type': 'City',
                name: 'Dubai',
              },
              priceRange: '$$$',
            }),
          }}
        />
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">
            Web Design & Digital Solutions in Dubai
          </h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Oakroot Solutions delivers world-class digital experiences for Dubai businesses. 
            From cutting-edge web design to AI automation and performance marketing, we help 
            UAE businesses thrive in the digital economy.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=675&fit=crop"
            alt="Dubai Skyline - Oakroot Solutions Digital Services"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Services Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Our Services in Dubai</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/web-design" className="hover:underline">
                  Web Design
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Premium, responsive websites designed for Dubai&apos;s competitive market. We create 
                digital experiences that drive conversions and build brand authority.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/digital-marketing" className="hover:underline">
                  Digital Marketing
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Performance-driven marketing strategies tailored for the UAE market. SEO, PPC, 
                and social media campaigns that deliver measurable results.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/branding" className="hover:underline">
                  Branding
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Complete brand identity solutions for Dubai businesses. From logo design to 
                comprehensive brand strategy, we help you stand out in the UAE market.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/app-development" className="hover:underline">
                  AI Automations
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Intelligent AI solutions to streamline operations for Dubai businesses. 
                Automate workflows, reduce costs, and boost productivity.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/app-development" className="hover:underline">
                  Software Development
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Custom software and mobile applications built for UAE businesses. Scalable, 
                secure solutions that grow with your business.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Why Dubai Businesses Choose Oakroot</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">SECURE. SCALABLE. SOVEREIGN.</h3>
              <p className="text-base lg:text-lg text-neutral-600 mb-4">
                We understand the unique needs of businesses in Dubai and the UAE. Our solutions 
                are built with enterprise-grade security, designed to scale with your growth, 
                and compliant with local regulations.
              </p>
              <ul className="space-y-3 text-base lg:text-lg text-neutral-600">
                <li>✓ Enterprise-grade security and data protection</li>
                <li>✓ Scalable infrastructure for rapid growth</li>
                <li>✓ Local market expertise and cultural understanding</li>
                <li>✓ 24/7 support across time zones</li>
                <li>✓ Proven track record with regional businesses</li>
              </ul>
            </div>
            <div className="w-full aspect-square relative overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop"
                alt="Digital Solutions for Dubai Businesses"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">Serving Dubai & the UAE</h3>
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
                className="inline-block bg-black text-white font-semibold rounded-full py-3 px-6 lg:px-8 hover:bg-gray-800 transition-colors text-sm lg:text-base min-h-[44px] flex items-center justify-center w-fit"
              >
                Schedule a Consultation
              </Link>
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">Business Hours</h3>
              <p className="text-base lg:text-lg text-neutral-600">
                Sunday - Thursday: 9:00 AM - 6:00 PM GST<br />
                Available for consultations across all time zones
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto bg-black text-white rounded-lg p-6 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">
            Ready to Transform Your Dubai Business?
          </h2>
          <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
            Let&apos;s discuss how we can help elevate your digital presence and drive 
            measurable growth for your UAE business.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-semibold rounded-full py-2.5 px-6 lg:py-3 lg:px-8 hover:bg-neutral-100 transition-colors text-sm lg:text-base min-h-[44px]"
          >
            Get Started Today
          </Link>
        </div>
      </main>
    </>
  );
}

