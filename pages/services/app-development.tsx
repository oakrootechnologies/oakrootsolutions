import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function AppDevelopmentPage() {
  return (
    <>
      <Head>
        <title>App Development - Oakroot</title>
        <meta name="description" content="Creating custom mobile and web applications that solve your unique business challenges." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">App Development</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Creating custom mobile and web applications that solve your unique business challenges. 
            We build powerful, scalable solutions that grow with you.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
          <Image
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=675&fit=crop"
            alt="App Development"
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
                Our app development services cover both mobile and web platforms, delivering 
                custom solutions tailored to your specific needs. We use cutting-edge technologies 
                to build applications that are fast, secure, and scalable.
              </p>
              <p className="text-lg text-neutral-600">
                Whether you need a native mobile app, a progressive web app, or a full-stack 
                web application, we have the expertise to bring your vision to life.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Expertise</h2>
              <ul className="space-y-4 text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Native iOS & Android Development</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Cross-Platform Mobile Apps (React Native, Flutter)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Progressive Web Applications (PWA)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Full-Stack Web Applications</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>API Development & Integration</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Cloud Deployment & DevOps</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Build Your App?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let's create a custom application that solves your unique business challenges.
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

