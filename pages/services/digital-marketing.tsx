import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function DigitalMarketingPage() {
  return (
    <>
      <Head>
        <title>Digital Marketing - Oakroot</title>
        <meta name="description" content="Growing your audience and driving conversions through data-driven marketing campaigns." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Digital Marketing</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Growing your audience and driving conversions through data-driven marketing campaigns. 
            We create strategies that find and engage your ideal customers.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop"
            alt="Digital Marketing"
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
                Our digital marketing services help you reach the right audience at the right time 
                with the right message. We combine creativity with data-driven insights to deliver 
                measurable results.
              </p>
              <p className="text-lg text-neutral-600">
                From social media marketing to SEO and content strategy, we provide a comprehensive 
                approach to growing your online presence and driving conversions.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Services</h2>
              <ul className="space-y-4 text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Social Media Marketing & Management</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Search Engine Optimization (SEO)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Content Marketing & Strategy</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Pay-Per-Click (PPC) Advertising</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Email Marketing Campaigns</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Analytics & Performance Tracking</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Grow Your Audience?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let's create a marketing strategy that drives predictable, sustainable growth.
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

