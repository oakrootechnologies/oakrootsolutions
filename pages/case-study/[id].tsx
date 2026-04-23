import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

const caseStudiesData = {
  'eco-smart': {
    title: 'EcoSmart Intelligence',
    category: 'AI Automation & Web',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    challenge: 'The client needed to automate complex resource allocation decisions that were previously handled manually, leading to inefficiencies and high operational overhead.',
    solution: 'We developed a custom AI agent system integrated with their existing ERP. The system uses machine learning to predict demand and optimize resource distribution in real-time.',
    results: [
      '40% reduction in operational costs',
      '99.9% accuracy in resource allocation',
      'Real-time visibility into global supply chains',
    ],
    fullStory: 'EcoSmart Intelligence represents a leap forward in renewable energy management. By leveraging sovereign AI models, we provided the client with a secure and scalable solution that they completely own, avoiding high monthly API costs while maintaining top-tier performance.',
  },
  'luxe-global': {
    title: 'Luxe Global Retail',
    category: 'E-commerce & Branding',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop',
    challenge: 'A legacy luxury brand was struggling to compete in the digital space, with a website that failed to reflect their premium values or convert modern shoppers.',
    solution: 'We completely reimagined their digital identity, building a high-performance headless e-commerce platform that combines stunning visual storytelling with a frictionless checkout experience.',
    results: [
      '300% increase in online conversions',
      '65% increase in average order value',
      'Award-winning visual design',
    ],
    fullStory: 'The challenge with luxury e-commerce is balancing performance with aesthetics. We used Next.js and Framer Motion to create a site that feels alive, with smooth transitions and high-resolution assets that load instantly, ensuring the customer journey is as premium as the products themselves.',
  },
  'urban-flow': {
    title: 'Urban Flow Logistics',
    category: 'App Development',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop',
    challenge: 'City-wide logistics were plagued by fragmentation and lack of real-time communication between drivers, warehouses, and headquarters.',
    solution: 'We built a comprehensive mobile ecosystem for iOS and Android, paired with a central control dashboard. The platform optimizes routes using live traffic data and automates document handling.',
    results: [
      '25% reduction in fuel consumption',
      'Zero paper-based errors since launch',
      'Average delivery time reduced by 15 minutes',
    ],
    fullStory: 'Urban Flow is more than just a tracking app; it is a full-stack operational tool. Built with React Native for cross-platform efficiency, it handles thousands of concurrent users and processes millions of data points daily to keep the city moving.',
  },
};

export default function CaseStudyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const study = caseStudiesData[id as keyof typeof caseStudiesData];

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/case-studies" className="text-blue-600 hover:underline">Back to Case Studies</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{study.title} | Case Study | Oakroot Solutions</title>
        <meta name="description" content={study.challenge} />
      </Head>

      <main className="bg-white text-black min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src={study.heroImage}
            alt={study.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/80 uppercase tracking-widest text-sm lg:text-base font-medium mb-4 block"
              >
                {study.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-8xl font-bold text-white uppercase leading-tight"
              >
                {study.title}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-4 lg:px-16 py-16 lg:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left Column - Challenge & Solution */}
              <div className="lg:col-span-8">
                <div className="mb-16 lg:mb-24">
                  <h2 className="text-sm uppercase tracking-widest text-neutral-400 mb-6 font-bold">The Challenge</h2>
                  <p className="text-2xl lg:text-4xl font-medium leading-snug">
                    {study.challenge}
                  </p>
                </div>
                
                <div className="mb-16 lg:mb-24">
                  <h2 className="text-sm uppercase tracking-widest text-neutral-400 mb-6 font-bold">The Solution</h2>
                  <p className="text-xl lg:text-2xl text-neutral-600 leading-relaxed mb-8">
                    {study.solution}
                  </p>
                  <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed">
                    {study.fullStory}
                  </p>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32 bg-neutral-50 p-8 lg:p-12 rounded-3xl">
                  <h2 className="text-sm uppercase tracking-widest text-neutral-400 mb-8 font-bold">Key Results</h2>
                  <ul className="space-y-8">
                    {study.results.map((result, index) => (
                      <li key={index} className="flex flex-col">
                        <span className="text-3xl lg:text-4xl font-bold mb-2">
                          {result.split(' ')[0]}
                        </span>
                        <span className="text-neutral-600 text-base lg:text-lg">
                          {result.split(' ').slice(1).join(' ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Case Study Navigation */}
        <section className="border-t border-neutral-200">
           <Link href="/case-studies" className="block py-16 lg:py-24 hover:bg-neutral-50 transition-colors">
              <div className="max-w-6xl mx-auto px-4 lg:px-16 flex justify-between items-center group">
                <div>
                  <span className="text-sm uppercase tracking-widest text-neutral-400 mb-2 block font-bold">Next Project</span>
                  <h2 className="text-3xl lg:text-6xl font-bold uppercase transition-transform group-hover:translate-x-4 duration-500">Back to Case Studies</h2>
                </div>
                <span className="text-4xl transition-transform group-hover:translate-x-4 duration-500">→</span>
              </div>
           </Link>
        </section>
      </main>
    </>
  );
}
