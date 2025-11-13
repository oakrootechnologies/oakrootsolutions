import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function WebDesignPage() {
  return (
    <>
      <Head>
        <title>Web Design - Oakroot</title>
        <meta name="description" content="Building responsive, high-performance websites that convert visitors into customers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Web Design</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Building responsive, high-performance websites that convert visitors into customers. 
            We create digital experiences that elevate your brand and drive results.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">What We Offer</h2>
              <p className="text-lg text-neutral-600 mb-4">
                Our web design services combine cutting-edge technology with creative excellence 
                to deliver websites that not only look stunning but perform exceptionally.
              </p>
              <p className="text-lg text-neutral-600">
                We focus on creating responsive, user-friendly interfaces that work seamlessly 
                across all devices, ensuring your audience has the best possible experience.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Process</h2>
              <ul className="space-y-4 text-lg text-neutral-600">
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
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Build Your Website?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let&apos;s create a digital experience that elevates your brand and drives results.
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

