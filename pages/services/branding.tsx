import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandingPage() {
  return (
    <>
      <Head>
        <title>Branding - Oakroot</title>
        <meta name="description" content="Crafting your unique brand identity, logo, and messaging that stands out and connects with your target audience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Branding</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Crafting your unique brand identity, logo, and messaging that stands out and connects 
            with your target audience. We build brands that truly represent you.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">What We Offer</h2>
              <p className="text-lg text-neutral-600 mb-4">
                Our branding services go beyond just creating a logo. We dive deep into your market, 
                vision, and values to build a comprehensive brand identity that resonates with your 
                audience and sets you apart from competitors.
              </p>
              <p className="text-lg text-neutral-600">
                From brand strategy to visual identity and messaging, we create a cohesive brand 
                experience that tells your story and builds lasting connections.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Services</h2>
              <ul className="space-y-4 text-lg text-neutral-600">
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
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Build Your Brand?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let's create a brand identity that truly represents you and connects with your audience.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black font-semibold rounded-full py-3 px-8 hover:bg-neutral-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

