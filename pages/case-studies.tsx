import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    id: 'eco-smart',
    title: 'EcoSmart Intelligence',
    category: 'AI Automation & Web',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
    description: 'How we reduced operational costs by 40% for a leading renewable energy provider through custom AI agents.',
  },
  {
    id: 'luxe-global',
    title: 'Luxe Global Retail',
    category: 'E-commerce & Branding',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    description: 'A complete digital transformation that resulted in a 300% increase in online conversions within six months.',
  },
  {
    id: 'urban-flow',
    title: 'Urban Flow Logistics',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
    description: 'Streamlining city-wide logistics with a real-time tracking and optimization platform.',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Head>
        <title>Case Studies | Oakroot Solutions</title>
        <meta
          name="description"
          content="Explore our success stories. See how Oakroot Solutions drives real business growth through innovation and creative strategy."
        />
      </Head>

      <main className="bg-white text-black min-h-screen">
        {/* Hero Section */}
        <section className="px-4 lg:px-16 pt-32 pb-16 lg:pt-48 lg:pb-32 bg-black text-white">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-9xl font-bold mb-8 uppercase"
            >
              Case <br /> Studies
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl lg:text-2xl text-neutral-400 max-w-2xl"
            >
              Real problems. Real solutions. Real results. <br />
              Explore how we help brands dominate their industries.
            </motion.p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="px-4 lg:px-16 py-12 lg:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] relative overflow-hidden rounded-2xl mb-6 lg:mb-8">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-2">
                    {study.category}
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold mb-4 uppercase group-hover:underline">
                    {study.title}
                  </h2>
                  <p className="text-lg lg:text-xl text-neutral-600 mb-6 lg:mb-8 max-w-xl">
                    {study.description}
                  </p>
                  <Link 
                    href={`/case-study/${study.id}`}
                    className="text-black font-bold flex items-center gap-2 group/link h-11"
                  >
                    View Project 
                    <span className="inline-block transition-transform group-hover/link:translate-x-2">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 lg:px-16 py-24 lg:py-48 bg-neutral-50 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-7xl font-bold mb-8 uppercase">Ready to be our next success story?</h2>
            <Link
              href="/contact"
              className="inline-block bg-black text-white font-bold px-12 py-5 rounded-full text-lg lg:text-xl hover:bg-neutral-800 transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
