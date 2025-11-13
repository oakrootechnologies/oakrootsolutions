import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function GraphicDesignPage() {
  return (
    <>
      <Head>
        <title>Graphic Design - Oakroot</title>
        <meta name="description" content="Creating stunning visual designs that communicate your message and elevate your brand." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Graphic Design</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Creating stunning visual designs that communicate your message and elevate your brand. 
            We combine creativity with strategic thinking to deliver designs that make an impact.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
          <Image
            src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=675&fit=crop"
            alt="Graphic Design"
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
                Our graphic design services cover everything from print materials to digital assets, 
                ensuring your brand looks consistent and professional across all touchpoints.
              </p>
              <p className="text-lg text-neutral-600">
                We work closely with you to understand your goals and create designs that not only 
                look beautiful but also effectively communicate your message and drive action.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Services</h2>
              <ul className="space-y-4 text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Print Design (Brochures, Flyers, Business Cards)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Digital Graphics & Social Media Assets</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Packaging Design</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Infographics & Data Visualization</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Presentation Design</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Illustration & Custom Graphics</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Visuals?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let&apos;s create stunning designs that communicate your message and make an impact.
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

