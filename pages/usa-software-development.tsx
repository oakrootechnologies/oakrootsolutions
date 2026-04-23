import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600,
  };
}

export default function USAPage() {
  return (
    <>
      <Head>
        <title>Oakroot Solutions - USA Software Development & Web Design</title>
        <meta
          name="description"
          content="Enterprise software development and web design services across the USA. Oakroot Solutions delivers secure, scalable solutions for American businesses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Oakroot Solutions - USA',
              image: 'https://oakrootsolutions.com/logo.png',
              '@id': 'https://oakrootsolutions.com/usa-software-development',
              url: 'https://oakrootsolutions.com/usa-software-development',
              telephone: '+919202212290',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
              areaServed: {
                '@type': 'Country',
                name: 'United States',
              },
              priceRange: '$$$',
            }),
          }}
        />

        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">
            Software Development & Web Design for USA Businesses
          </h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Oakroot Solutions delivers enterprise-grade software development, web design, and 
            digital transformation services for businesses across the United States. From startups 
            to Fortune 500 companies, we build solutions that scale.
          </p>
        </div>

        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
          <Image
            src="https://images.unsplash.com/photo-1485872299829-c673f5194813?w=1200&h=675&fit=crop"
            alt="USA Business Technology Solutions"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Our Services for USA Companies</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/app-development" className="hover:underline">
                  Software Development
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Custom enterprise software, SaaS platforms, and mobile applications built with 
                cutting-edge technologies. Secure, scalable, and compliant with US regulations.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/web-design" className="hover:underline">
                  Web Design
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Conversion-focused web design that drives results. We create responsive, 
                accessible websites optimized for performance and user experience.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/app-development" className="hover:underline">
                  AI & Automation
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Intelligent automation solutions powered by AI. Streamline operations, reduce 
                costs, and unlock new capabilities with machine learning and automation.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/digital-marketing" className="hover:underline">
                  Digital Marketing
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Data-driven marketing strategies for the US market. SEO, PPC, content marketing, 
                and social media campaigns that deliver measurable ROI.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/branding" className="hover:underline">
                  Branding & Strategy
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Comprehensive brand development and digital strategy. We help US businesses 
                build powerful brands that resonate with their target audience.
              </p>
            </div>
            <div className="p-6 lg:p-8 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                <Link href="/services/app-development" className="hover:underline">
                  Cloud Solutions
                </Link>
              </h3>
              <p className="text-sm lg:text-base text-neutral-600">
                Cloud migration, infrastructure, and DevOps services. Build resilient, scalable 
                systems on AWS, Azure, or Google Cloud Platform.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Why US Companies Choose Oakroot</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">SECURE. SCALABLE. SOVEREIGN.</h3>
              <p className="text-base lg:text-lg text-neutral-600 mb-4">
                We understand the unique requirements of US businesses. Our solutions are built 
                with enterprise-grade security, designed for massive scale, and compliant with 
                US regulations including HIPAA, SOC 2, and GDPR.
              </p>
              <ul className="space-y-3 text-base lg:text-lg text-neutral-600">
                <li>✓ SOC 2, HIPAA, and GDPR compliant solutions</li>
                <li>✓ Enterprise-grade security and data protection</li>
                <li>✓ Scalable architecture for high-growth companies</li>
                <li>✓ US-based project management and support</li>
                <li>✓ Transparent pricing with no hidden costs</li>
              </ul>
            </div>
            <div className="w-full aspect-square relative overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=800&fit=crop"
                alt="Enterprise Software Development"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4">Serving Businesses Nationwide</h3>
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
                Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                Available across all US time zones
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto bg-black text-white rounded-lg p-6 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">
            Ready to Scale Your US Business?
          </h2>
          <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
            Let&apos;s discuss how we can help you build software that drives growth and 
            delivers exceptional user experiences.
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


