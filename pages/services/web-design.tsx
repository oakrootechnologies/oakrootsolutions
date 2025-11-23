import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';

export default function WebDesignPage() {
  return (
    <>
      <Head>
        <title>Web Design | Oakroot Solutions</title>
        <meta name="description" content="Building responsive, high-performance websites that convert visitors into customers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">Web Design</h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Building responsive, high-performance websites that convert visitors into customers. 
            We create digital experiences that elevate your brand and drive results.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
          <Image
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=675&fit=crop"
            alt="Web Design"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8 lg:mb-16">
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">What We Offer</h2>
              <p className="text-base lg:text-lg text-neutral-600 mb-3 lg:mb-4">
                Our web design services combine cutting-edge technology with creative excellence 
                to deliver websites that not only look stunning but perform exceptionally.
              </p>
              <p className="text-base lg:text-lg text-neutral-600">
                We focus on creating responsive, user-friendly interfaces that work seamlessly 
                across all devices, ensuring your audience has the best possible experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Process</h2>
              <ul className="space-y-3 lg:space-y-4 text-base lg:text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">01.</span>
                  <span>Discovery & Strategy - Understanding your goals and target audience</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">02.</span>
                  <span>Design & Prototyping - Creating wireframes and visual designs</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">03.</span>
                  <span>Development - Building with clean, scalable code</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">04.</span>
                  <span>Testing & Launch - Ensuring quality and performance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-6 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">Ready to Build Your Website?</h2>
            <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
              Let&apos;s create a digital experience that elevates your brand and drives results.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black font-semibold rounded-full py-2.5 px-6 lg:py-3 lg:px-8 hover:bg-neutral-100 transition-colors text-sm lg:text-base min-h-[44px] flex items-center justify-center"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection
          title="Web Design FAQs"
          faqs={[
            {
              question: 'How long does it take to build a website?',
              answer: 'A typical website project takes 6-12 weeks from initial consultation to launch. Timeline depends on the complexity, number of pages, and custom features required.',
            },
            {
              question: 'Do you provide ongoing website maintenance?',
              answer: 'Yes, we offer maintenance packages that include security updates, content updates, performance monitoring, and technical support to keep your website running smoothly.',
            },
            {
              question: 'Will my website be mobile-responsive?',
              answer: 'Absolutely. All our websites are built mobile-first and fully responsive, ensuring optimal performance and user experience across all devices and screen sizes.',
            },
            {
              question: 'Can you integrate third-party tools and services?',
              answer: 'Yes, we can integrate various third-party services including payment gateways, CRM systems, analytics tools, email marketing platforms, and more based on your business needs.',
            },
          ]}
        />
      </main>
      
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Web Design',
            description: 'Building responsive, high-performance websites that convert visitors into customers.',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Oakroot Solutions',
              url: 'https://oakrootsolutions.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'Indore',
            },
          }),
        }}
      />
    </>
  );
}

