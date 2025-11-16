import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';

export default function VideoPhotoPage() {
  return (
    <>
      <Head>
        <title>Video & Photo | Oakroot Solutions</title>
        <meta name="description" content="Creating compelling video and photography content that tells your story and engages your audience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">Video & Photo</h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Creating compelling video and photography content that tells your story and engages 
            your audience. We capture moments that matter and turn them into powerful marketing assets.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop"
            alt="Video & Photo"
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
                Our video and photography services help you tell your brand story through visual 
                content that captivates and converts. From product photography to promotional 
                videos, we create content that resonates with your audience.
              </p>
              <p className="text-base lg:text-lg text-neutral-600">
                We handle everything from concept to production to post-production, ensuring 
                your content is polished, professional, and ready to make an impact.
              </p>
            </div>
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Services</h2>
              <ul className="space-y-3 lg:space-y-4 text-base lg:text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Product Photography</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Corporate & Event Photography</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Commercial Video Production</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Social Media Video Content</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Video Editing & Post-Production</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Drone Photography & Videography</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-6 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">Ready to Tell Your Story?</h2>
            <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
              Let&apos;s create compelling video and photo content that engages your audience and drives results.
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
          title="Video & Photo FAQs"
          faqs={[
            {
              question: 'Do you provide equipment for video and photo shoots?',
              answer: 'Yes, we have professional-grade equipment including cameras, lighting, audio equipment, and accessories. We ensure all equipment is properly maintained and suitable for your project requirements.',
            },
            {
              question: 'What is included in video production services?',
              answer: 'Our video production includes pre-production planning, scriptwriting, filming, editing, color grading, sound design, and final delivery in your preferred formats. We handle the entire production process from concept to completion.',
            },
            {
              question: 'How long does video editing take?',
              answer: 'Editing timeline depends on video length and complexity. A simple 1-2 minute video typically takes 1-2 weeks, while longer or more complex videos can take 3-4 weeks. We provide timelines during project planning.',
            },
            {
              question: 'Can you create content for social media?',
              answer: 'Absolutely. We create optimized video and photo content specifically designed for social media platforms including Instagram, Facebook, LinkedIn, YouTube, and TikTok, ensuring maximum engagement and reach.',
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
            name: 'Video & Photo',
            description: 'Creating compelling video and photography content that tells your story and engages your audience.',
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

