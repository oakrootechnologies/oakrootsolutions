import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior UI/UX Designer',
      department: 'Design',
      location: 'Indore / Remote',
      type: 'Full-time',
    },
    {
      title: 'Full-Stack Developer',
      department: 'Development',
      location: 'Indore / Remote',
      type: 'Full-time',
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Indore / Remote',
      type: 'Full-time',
    },
    {
      title: 'Brand Strategist',
      department: 'Strategy',
      location: 'Indore / Remote',
      type: 'Full-time',
    },
  ];

  return (
    <>
      <Head>
        <title>Careers - Oakroot</title>
        <meta name="description" content="Join the Oakroot team - We're always looking for talented individuals to join our creative team." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Careers</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Join our team of creative professionals and help us elevate brands through innovative 
            design and strategic marketing.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=675&fit=crop"
            alt="Careers at Oakroot"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Work With Us?</h2>
              <p className="text-lg text-neutral-600 mb-4">
                At Oakroot, we believe in creating an environment where talented individuals can 
                thrive, grow, and do their best work. We're committed to fostering creativity, 
                innovation, and collaboration.
              </p>
              <p className="text-lg text-neutral-600">
                Join a team that values your expertise, supports your growth, and celebrates 
                your achievements. We offer competitive benefits, flexible work arrangements, 
                and opportunities to work on exciting projects with leading brands.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">What We Offer</h2>
              <ul className="space-y-4 text-lg text-neutral-600">
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Competitive salary and benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Flexible work arrangements</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Professional development opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Creative and collaborative work environment</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Work on exciting projects with leading brands</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">•</span>
                  <span>Opportunities for growth and advancement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-lg p-6 hover:border-black transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-neutral-600">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-block bg-black text-white font-semibold rounded-full py-2 px-6 hover:bg-neutral-800 transition-colors whitespace-nowrap"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Application */}
          <div className="bg-neutral-50 rounded-lg p-12 mb-16">
            <h2 className="text-4xl font-bold mb-4">Don't See a Match?</h2>
            <p className="text-lg text-neutral-600 mb-6">
              We're always looking for talented individuals. Even if you don't see a position 
              that matches your skills, we'd love to hear from you. Send us your resume and 
              let us know how you'd like to contribute to our team.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-black text-white font-semibold rounded-full py-3 px-8 hover:bg-neutral-800 transition-colors"
            >
              Send Your Resume
            </Link>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Let's discuss how you can contribute to our team and grow your career with Oakroot.
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

