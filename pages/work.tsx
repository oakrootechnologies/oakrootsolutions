import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// ssr: false — no loading fallback (loading fallback + ssr:false = hydration error)
const ProjectRingCanvas = dynamic(() => import('@/components/ProjectRingCanvas'), {
  ssr: false,
});

const caseStudies = [
  {
    id: 'eco-smart',
    title: 'EcoSmart Intelligence',
    category: 'AI Automation & Web',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
    description: 'How we reduced operational costs by 40% for a leading renewable energy provider through custom AI agents.',
    stat: '40%',
    statLabel: 'Cost Reduction',
  },
  {
    id: 'luxe-global',
    title: 'Luxe Global Retail',
    category: 'E-commerce & Branding',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    description: 'A complete digital transformation that resulted in a 300% increase in online conversions within six months.',
    stat: '300%',
    statLabel: 'More Conversions',
  },
  {
    id: 'urban-flow',
    title: 'Urban Flow Logistics',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
    description: 'Streamlining city-wide logistics with a real-time tracking and optimization platform.',
    stat: '15min',
    statLabel: 'Faster Delivery',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Work() {
  // Mount guard — ensures 3D canvas only renders on the client,
  // preventing SSR/client HTML mismatch (hydration error).
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Head>
        <title>Work | Oakroot Solutions</title>
        <meta
          name="description"
          content="Explore our portfolio of creative projects and digital solutions. See how Oakroot Solutions elevates brands through innovative design and development."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ─── 3D Ring Hero (client-only) ───────────────────────────────────── */}
      {/* suppressHydrationWarning prevents React complaining about the
          section being absent on the server during the first reconciliation */}
      <section
        suppressHydrationWarning
        className="relative w-full h-[60vh] lg:h-screen bg-black overflow-hidden"
      >
        {mounted && (
          <>
            <ProjectRingCanvas
              setHoveredProject={() => {}}
              radius={15 * 1.15}
              imageScale={[4 * 1.15, 2 * 1.15]}
              centered={true}
            />
            {/* Bottom fade to white */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </>
        )}

        {/* Page heading — always rendered (server + client) */}
        <div className="absolute inset-0 flex items-end pointer-events-none">
          <div className="px-6 lg:px-16 pb-10 lg:pb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-7xl lg:text-9xl font-bold text-white uppercase leading-none"
            >
              Our Work
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ─── Case Studies Section ──────────────────────────────────────────── */}
      <section className="bg-white px-6 lg:px-16 pt-12 pb-24 lg:pt-20 lg:pb-40">
        {/* Section label */}
        <div className="max-w-7xl mx-auto mb-12 lg:mb-20">
          <p className="text-xs lg:text-sm uppercase tracking-widest text-neutral-400 font-bold">
            Case Studies
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              variants={cardVariants}
              className={index % 2 !== 0 ? 'lg:mt-24' : ''}
            >
              <Link href={`/case-study/${study.id}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-7 lg:mb-8 bg-neutral-100">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Key stat badge */}
                  <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-black leading-tight">
                      {study.stat}
                    </div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                      {study.statLabel}
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                    {study.category}
                  </span>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold uppercase mb-4 leading-tight group-hover:underline underline-offset-4 decoration-2">
                    {study.title}
                  </h2>
                  <p className="text-base lg:text-lg text-neutral-600 max-w-lg mb-6">
                    {study.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black">
                    View Case Study
                    <span className="transition-transform duration-300 group-hover:translate-x-2 inline-block">→</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-black text-white px-6 lg:px-16 py-24 lg:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-7xl font-bold uppercase mb-8 leading-tight">
            Ready to be our next success story?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-bold px-12 py-5 rounded-full text-base lg:text-lg hover:bg-neutral-200 transition-colors"
          >
            Start Your Project
          </Link>
        </motion.div>
      </section>
    </>
  );
}
