import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '@/components/FAQSection';

export default function AppDevelopmentPage() {
  return (
    <>
      <Head>
        <title>App Development | Oakroot Solutions</title>
        <meta name="description" content="Creating custom mobile and web applications that solve your unique business challenges." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">App Development</h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            Creating custom mobile and web applications that solve your unique business challenges. 
            We build powerful, scalable solutions that grow with you.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8 lg:mb-16">
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">What We Offer</h2>
              <p className="text-base lg:text-lg text-neutral-600 mb-3 lg:mb-4">
                Our app development services cover both mobile and web platforms, delivering 
                custom solutions tailored to your specific needs. We use cutting-edge technologies 
                to build applications that are fast, secure, and scalable.
              </p>
              <p className="text-base lg:text-lg text-neutral-600">
                Whether you need a native mobile app, a progressive web app, or a full-stack 
                web application, we have the expertise to bring your vision to life.
              </p>
            </div>
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Expertise</h2>
              <ul className="space-y-3 lg:space-y-4 text-base lg:text-lg text-neutral-600">
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
          <div className="bg-black text-white rounded-lg p-6 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">Ready to Build Your App?</h2>
            <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
              Let&apos;s create a custom application that solves your unique business challenges.
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
          title="App Development FAQs"
          faqs={[
            {
              question: 'What technologies do you use for app development?',
              answer: 'We use modern, scalable technologies including React Native for cross-platform mobile apps, Next.js for web applications, Node.js for backend services, and cloud platforms like AWS and Vercel for deployment. We choose the best stack based on your specific requirements.',
            },
            {
              question: 'How long does it take to develop a mobile app?',
              answer: 'Development timeline depends on complexity. A simple app typically takes 8-12 weeks, while more complex applications with custom features can take 16-24 weeks. We provide detailed timelines during the planning phase.',
            },
            {
              question: 'Do you provide app maintenance and updates?',
              answer: 'Yes, we offer ongoing maintenance packages that include bug fixes, security updates, feature enhancements, and technical support to ensure your app continues to perform optimally.',
            },
            {
              question: 'Can you help with app store submission and approval?',
              answer: 'Absolutely. We handle the entire app store submission process for both iOS App Store and Google Play Store, including preparing all required assets, metadata, and ensuring compliance with store guidelines.',
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
            name: 'App Development',
            description: 'Creating custom mobile and web applications that solve your unique business challenges.',
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

