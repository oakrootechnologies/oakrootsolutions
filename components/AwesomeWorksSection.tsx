'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const works = [
  {
    id: 'betely',
    title: 'Betely Agency',
    category: 'UI/UX Website Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
  },
  {
    id: 'growthy',
    title: 'Growthy',
    category: 'UI/UX Mobile App Design',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1000&q=80',
  },
  {
    id: 'alpnace',
    title: 'Alpnace',
    category: 'Branding Design',
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1000&q=80',
  },
];

export default function AwesomeWorksSection() {
  return (
    <section className="w-full bg-white text-black py-20 lg:py-32 px-6 lg:px-[150px] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 gap-8">
          <div className="flex flex-col">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tight"
            >
              Awesome
              <br />
              <span className="flex items-center gap-3 sm:gap-4 mt-2">
                {/* Geometric logo from the reference */}
                <svg 
                  viewBox="0 0 100 100" 
                  className="inline-block w-[0.8em] h-[0.8em] text-neutral-300" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <circle cx="35" cy="50" r="25" />
                  <circle cx="50" cy="50" r="25" />
                  <circle cx="65" cy="50" r="25" />
                  <path d="M 5 50 L 95 50" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                Works
              </span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/work" className="group flex items-center gap-4">
              <span className="text-sm lg:text-base uppercase tracking-widest font-bold">Learn More</span>
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-neutral-300 flex justify-center items-center group-hover:bg-aurora group-hover:border-aurora group-hover:text-white transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="10 5 19 5 19 14"></polyline>
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {works.map((work, index) => (
            <motion.div 
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Link href={`/case-study/${work.id}`} className="group cursor-pointer flex flex-col h-full block">
                {/* Image */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 mb-6 lg:mb-8">
                  <Image 
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle overlay for contrast */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                
                {/* Card Info */}
                <div className="flex justify-between items-end border-b border-neutral-200 pb-5 relative">
                  <div className="flex flex-col">
                    <h3 className="text-2xl lg:text-3xl font-bold uppercase mb-2 tracking-tight group-hover:text-neutral-600 transition-colors duration-300">{work.title}</h3>
                    <p className="text-xs lg:text-sm text-neutral-400 font-medium uppercase tracking-widest">{work.category}</p>
                  </div>
                  
                  {/* Circular Arrow Button (matching the reference styling but with Oakroot feel) */}
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-neutral-200 flex justify-center items-center text-black group-hover:bg-aurora group-hover:border-aurora group-hover:text-white transition-all duration-300 shrink-0">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>

                  {/* Hover line animation below the standard border */}
                  <div className="absolute bottom-[-1px] left-0 w-0 h-[1.5px] bg-aurora group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
