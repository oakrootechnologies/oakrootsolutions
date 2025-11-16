import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';

export default function BrandingPage() {
  return (
    <>
      <Head>
        <title>Branding | Oakroot Solutions</title>
        <meta name="description" content="Crafting your unique brand identity, logo, and messaging that stands out and connects with your target audience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">Branding</h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Crafting your unique brand identity, logo, and messaging that stands out and connects 
            with your target audience. We build brands that truly represent you.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
          <Image
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop"
            alt="Branding"
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
                Our branding services go beyond just creating a logo. We dive deep into your market, 
                vision, and values to build a comprehensive brand identity that resonates with your 
                audience and sets you apart from competitors.
              </p>
              <p className="text-base lg:text-lg text-neutral-600">
                From brand strategy to visual identity and messaging, we create a cohesive brand 
                experience that tells your story and builds lasting connections.
              </p>
            </div>
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Services</h2>
              <ul className="space-y-3 lg:space-y-4 text-base lg:text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Brand Strategy & Positioning</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Logo Design & Visual Identity</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Brand Guidelines & Style Guides</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Brand Messaging & Voice</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Brand Collateral Design</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Rebranding & Brand Refresh</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-6 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">Ready to Build Your Brand?</h2>
            <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
              Let&apos;s create a brand identity that truly represents you and connects with your audience.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black font-semibold rounded-full py-2.5 px-6 lg:py-3 lg:px-8 hover:bg-neutral-100 transition-colors text-sm lg:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection
          title="Branding FAQs"
          faqs={[
            {
              question: 'How long does a branding project typically take?',
              answer: 'A complete branding project typically takes 4-8 weeks, depending on the scope and complexity. This includes research, strategy development, design iterations, and final brand guidelines.',
            },
            {
              question: 'What deliverables are included in a branding package?',
              answer: 'Our branding packages include logo design, brand guidelines, color palette, typography system, brand messaging, and basic brand collateral. Additional items can be added based on your needs.',
            },
            {
              question: 'Do you offer rebranding services for existing businesses?',
              answer: 'Yes, we specialize in rebranding and brand refresh projects. We help businesses evolve their brand identity while maintaining brand recognition and customer loyalty.',
            },
            {
              question: 'Can you help with brand strategy and positioning?',
              answer: 'Absolutely. Brand strategy is a core part of our service. We conduct market research, competitor analysis, and develop a comprehensive brand positioning strategy before moving to visual design.',
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
            name: 'Branding',
            description: 'Crafting your unique brand identity, logo, and messaging that stands out and connects with your target audience.',
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

