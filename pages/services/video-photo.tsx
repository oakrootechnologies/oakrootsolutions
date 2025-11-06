import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function VideoPhotoPage() {
  return (
    <>
      <Head>
        <title>Video & Photo - Oakroot</title>
        <meta name="description" content="Creating compelling video and photography content that tells your story and engages your audience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Video & Photo</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Creating compelling video and photography content that tells your story and engages 
            your audience. We capture moments that matter and turn them into powerful marketing assets.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">What We Offer</h2>
              <p className="text-lg text-neutral-600 mb-4">
                Our video and photography services help you tell your brand story through visual 
                content that captivates and converts. From product photography to promotional 
                videos, we create content that resonates with your audience.
              </p>
              <p className="text-lg text-neutral-600">
                We handle everything from concept to production to post-production, ensuring 
                your content is polished, professional, and ready to make an impact.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Services</h2>
              <ul className="space-y-4 text-lg text-neutral-600">
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
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Tell Your Story?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let's create compelling video and photo content that engages your audience and drives results.
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

