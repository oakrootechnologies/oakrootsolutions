import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';

export default function DigitalMarketingPage() {
  return (
    <>
      <Head>
        <title>Digital Marketing | Oakroot Solutions</title>
        <meta name="description" content="Growing your audience and driving conversions through data-driven marketing campaigns." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">Digital Marketing</h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Growing your audience and driving conversions through data-driven marketing campaigns. 
            We create strategies that find and engage your ideal customers.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8 lg:mb-16">
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">What We Offer</h2>
              <p className="text-base lg:text-lg text-neutral-600 mb-3 lg:mb-4">
                Our digital marketing services help you reach the right audience at the right time 
                with the right message. We combine creativity with data-driven insights to deliver 
                measurable results.
              </p>
              <p className="text-base lg:text-lg text-neutral-600">
                From social media marketing to SEO and content strategy, we provide a comprehensive 
                approach to growing your online presence and driving conversions.
              </p>
            </div>
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Services</h2>
              <ul className="space-y-3 lg:space-y-4 text-base lg:text-lg text-neutral-600">
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
          <div className="bg-black text-white rounded-lg p-6 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">Ready to Grow Your Audience?</h2>
            <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
              Let&apos;s create a marketing strategy that drives predictable, sustainable growth.
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
          title="Digital Marketing FAQs"
          faqs={[
            {
              question: 'How do you measure marketing campaign success?',
              answer: 'We use comprehensive analytics and tracking tools to measure key metrics including website traffic, conversion rates, lead generation, ROI, and engagement rates. You\'ll receive regular reports showing campaign performance and insights.',
            },
            {
              question: 'What is the typical timeline to see results from digital marketing?',
              answer: 'Results vary by strategy. SEO typically shows results in 3-6 months, while paid advertising can show immediate results. Social media marketing usually shows engagement improvements within 4-8 weeks. We set realistic expectations based on your specific goals.',
            },
            {
              question: 'Do you manage social media accounts?',
              answer: 'Yes, we offer full social media management services including content creation, posting schedules, community engagement, and performance monitoring across all major platforms.',
            },
            {
              question: 'Can you help with local SEO for my business?',
              answer: 'Absolutely. We specialize in local SEO strategies including Google Business Profile optimization, local citations, location-based content, and local link building to help your business rank higher in local search results.',
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
            name: 'Digital Marketing',
            description: 'Growing your audience and driving conversions through data-driven marketing campaigns.',
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

