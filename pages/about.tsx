import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Oakroot</title>
        <meta name="description" content="Learn about Oakroot Solutions - Elevating brands through creative strategy and conversion-focused marketing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            We&apos;re your creative partner, here to grow your business, solve challenges, and elevate 
            your brand with lasting impact.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop"
            alt="About Oakroot"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-600 mb-4">
                At Oakroot, we believe in elevating brands through creative strategy and 
                conversion-focused marketing. We&apos;re not just another agency—we&apos;re your 
                partners in growth.
              </p>
              <p className="text-lg text-neutral-600">
                Our mission is to help businesses of all sizes build their digital presence, 
                connect with their audience, and achieve sustainable growth through innovative 
                design and strategic marketing.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">What We Do</h2>
              <p className="text-lg text-neutral-600 mb-4">
                We take a holistic approach to brand elevation, offering a full suite of 
                creative services from design to branding and marketing, video production, 
                and more.
              </p>
              <p className="text-lg text-neutral-600">
                Our team brings together the best minds in design and development to create 
                digital experiences that elevate your brand and drive results. We ensure your 
                brand connects with your audience across every touchpoint.
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-12 mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Creativity</h3>
                <p className="text-neutral-600">
                  We push boundaries and think outside the box to deliver innovative solutions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-neutral-600">
                  We&apos;re committed to delivering the highest quality work in everything we do.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Partnership</h3>
                <p className="text-neutral-600">
                  We work closely with our clients as true partners in their success.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let&apos;s discuss how we can help elevate your brand and drive results.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black font-semibold rounded-full py-3 px-8 hover:bg-neutral-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

