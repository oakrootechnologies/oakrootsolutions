import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function TalentPage() {
  return (
    <>
      <Head>
        <title>Our Talent | Oakroot Solutions</title>
        <meta name="description" content="Meet the talented team behind Oakroot Solutions - Elite talent, unmatched creativity. Discover our experts in design, development, and digital marketing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 lg:mb-6 leading-tight">Our Talent</h1>
          <p className="text-base lg:text-xl text-neutral-600 max-w-3xl">
            We bring together the best minds in design and development to create digital experiences 
            that elevate your brand and drive results.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-8 lg:mb-16">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop"
            alt="Our Talent"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8 lg:mb-16">
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Elite Talent</h2>
              <p className="text-base lg:text-lg text-neutral-600 mb-3 lg:mb-4">
                Our team consists of top creative professionals, designers, developers, and 
                strategists who are passionate about what they do. We source the best talent 
                to ensure your projects are handled by experts.
              </p>
              <p className="text-base lg:text-lg text-neutral-600">
                Each team member brings unique skills and perspectives, allowing us to tackle 
                complex challenges and deliver innovative solutions that exceed expectations.
              </p>
            </div>
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Expertise</h2>
              <ul className="space-y-3 lg:space-y-4 text-base lg:text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Brand Strategy & Design</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>UI/UX Design & Development</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Full-Stack Development</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Digital Marketing & SEO</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Video Production & Photography</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>AI & Automation Solutions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-6 lg:p-12 mb-8 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">Why Choose Our Team?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Proven Track Record</h3>
                <p className="text-neutral-600">
                  Our team has successfully delivered projects for clients across various industries, 
                  from startups to established enterprises.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
                <p className="text-neutral-600">
                  We stay ahead of industry trends and continuously upgrade our skills to deliver 
                  cutting-edge solutions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Collaborative Approach</h3>
                <p className="text-neutral-600">
                  We work as a cohesive unit, combining our diverse expertise to solve complex 
                  challenges together.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Client-Focused</h3>
                <p className="text-neutral-600">
                  Your success is our priority. We&apos;re committed to understanding your needs and 
                  delivering solutions that drive results.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-6 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">Join Our Team</h2>
            <p className="text-base lg:text-xl text-neutral-300 mb-6 lg:mb-8">
              Are you a talented designer, developer, or strategist? We&apos;re always looking for 
              exceptional people to join our team.
            </p>
            <Link
              href="/careers"
              className="inline-block bg-white text-black font-semibold rounded-full py-2.5 px-6 lg:py-3 lg:px-8 hover:bg-neutral-100 transition-colors text-sm lg:text-base"
            >
              View Careers
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

