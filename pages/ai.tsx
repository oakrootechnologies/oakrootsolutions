'use client';

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

// Globe is client-only (uses canvas + cobe WebGL)
const Globe = dynamic(
  () => import('@/components/ui/globe').then((m) => ({ default: m.Globe })),
  { ssr: false }
);

/* ─── colour tokens ─────────────────────────────────────────── */
const C = {
  bg: '#F5F4F0',
  ink: '#1E1B2E',
  inkLight: '#4A4660',
  pill: '#1E1B2E',
  pillText: '#F5F4F0',
  blob1: '#D9D6FF',   // lavender
  blob2: '#FFD6E4',   // rose
  blob3: '#C8E8FF',   // sky
  card: '#EBEBEB',
  border: '#DDDBD6',
};

/* ─── tiny helpers ───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Blob ───────────────────────────────────────────────────── */
function Blob({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute', borderRadius: '50%', background: color,
      filter: 'blur(80px)', opacity: 0.55, pointerEvents: 'none',
      ...style,
    }} />
  );
}



/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const [email, setEmail] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={containerRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '80px' }}>
      {/* Blobs */}
      <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', y: blobY }}>
        <Blob color={C.blob1} style={{ width: 520, height: 520, top: '5%', left: '-8%' }} />
        <Blob color={C.blob2} style={{ width: 420, height: 420, top: '10%', right: '-6%' }} />
        <Blob color={C.blob3} style={{ width: 380, height: 380, bottom: '5%', left: '30%' }} />
      </motion.div>

      {/* Interactive Globe */}
      <div style={{ position: 'absolute', bottom: '-15%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 700, aspectRatio: '1 / 1', pointerEvents: 'none' }}>
        <Globe className="top-0" config={{
          width: 800, height: 800, onRender: () => {},
          devicePixelRatio: 2, phi: 0, theta: 0.3,
          dark: 0, diffuse: 0.5, mapSamples: 16000,
          mapBrightness: 1.3,
          baseColor: [0.95, 0.93, 1],
          markerColor: [0.5, 0.4, 0.9],
          glowColor: [0.85, 0.82, 1],
          markers: [
            { location: [19.076, 72.8777], size: 0.08 },
            { location: [40.7128, -74.006], size: 0.1 },
            { location: [51.5074, -0.1278], size: 0.07 },
            { location: [35.6762, 139.6503], size: 0.06 },
            { location: [-33.8688, 151.2093], size: 0.05 },
            { location: [1.3521, 103.8198], size: 0.04 },
          ],
        }} />
      </div>

      {/* Text content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 780, padding: '0 24px' }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)', fontWeight: 400, color: C.ink, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
          The Future of Your Operations<br />is Automated.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: C.inkLight, lineHeight: 1.6, maxWidth: 600, margin: '0 auto 40px' }}>
          We build intelligent systems that eliminate bottlenecks, reduce headcount dependencies, and scale without friction.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(e) => { e.preventDefault(); window.location.href = `/contact?email=${encodeURIComponent(email)}&type=audit`; }}
          style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, borderRadius: '999px', padding: '6px 6px 6px 24px', maxWidth: 440, margin: '0 auto', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <input
            type="email" placeholder="Enter your email for an automation audit" value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '0.88rem', color: C.ink, fontFamily: 'inherit' }} />
          <button type="submit"
            style={{ width: 44, height: 44, borderRadius: '50%', background: C.pill, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.pillText} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        </motion.form>
      </div>
    </section>
  );
}

/* ─── Pillars ─────────────────────────────────────────────────── */
const pillars = [
  { n: '01', title: 'Workflow Automation', body: 'Stop paying humans to do robotic work. We identify redundant processes and replace them with flawless, automated logic.' },
  { n: '02', title: 'Custom AI Agents', body: 'Intelligent systems trained exclusively on your sovereign data. From parsing complex legal contracts to handling tier-1 customer logic.' },
  { n: '03', title: 'Legacy Integration', body: 'We don\'t force you to change your software. We build the connective tissue that makes your current, disconnected tools communicate instantly.' },
  { n: '04', title: 'Sovereign Deployment', body: 'Total data privacy. Engineered for high-stakes industries where security is non-negotiable. Your data never leaves your control.' },
];

function Pillars() {
  return (
    <section style={{ padding: '120px 48px', position: 'relative' }}>
      {/* Curved connector line */}
      <svg style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', opacity: 0.18 }} width="900" height="120" viewBox="0 0 900 120">
        <path d="M 0 10 Q 450 140 900 10" fill="none" stroke={C.ink} strokeWidth="1.5" />
      </svg>

      <FadeUp className="" delay={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', maxWidth: 1100, margin: '0 auto' }}>
          {pillars.map((p, i) => (
            <FadeUp key={p.n} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.4rem', color: C.inkLight, opacity: 0.35, marginBottom: 16, fontWeight: 300 }}>{p.n}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: C.ink, marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: '0.88rem', color: C.inkLight, lineHeight: 1.65, margin: 0 }}>{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.4}>
        <div style={{ textAlign: 'center', marginTop: 72 }}>
          <Link href="#vision" style={{ display: 'inline-block', border: `1px solid ${C.ink}`, borderRadius: '999px', padding: '12px 32px', fontSize: '0.78rem', fontWeight: 600, color: C.ink, textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Explore Capabilities</Link>
        </div>
      </FadeUp>
    </section>
  );
}

/* ─── Vision ─────────────────────────────────────────────────── */
function Vision() {
  return (
    <section id="vision" style={{ padding: '100px 48px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: C.inkLight, textAlign: 'center', maxWidth: 640, margin: '0 auto 80px', lineHeight: 1.8 }}>
            For decades, scaling a business meant one thing: hiring more humans to do repetitive, manual work. That era is over.
          </p>
        </FadeUp>

        {/* Fan of image placeholders */}
        <div style={{ position: 'relative', height: 320, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 80 }}>
          {[-30, -15, 0, 15, 30].map((deg, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.05, zIndex: 10 }}
                style={{ position: 'absolute', width: 140, height: 220, background: `linear-gradient(135deg, ${C.blob1}66, ${C.blob2}44)`, border: `1px solid ${C.border}`, borderRadius: 16, transform: `rotate(${deg}deg) translateY(${Math.abs(deg) * 0.6}px)`, transformOrigin: 'bottom center', cursor: 'pointer', backdropFilter: 'blur(8px)' }} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: C.inkLight, textAlign: 'center', maxWidth: 640, margin: '0 auto 80px', lineHeight: 1.8 }}>
            As AI moves from theory to execution, the businesses that survive will be the ones that adapt.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 400, color: C.ink, textAlign: 'center', lineHeight: 1.25, maxWidth: 820, margin: '0 auto', letterSpacing: '-0.01em' }}>
            We don't build chatbots. We engineer intelligent infrastructure that automates your most expensive bottlenecks.
          </h2>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────── */
const steps = [
  { n: '01', title: 'Audit & Architect', body: 'We map your current operations, isolate the highest-cost bottlenecks, and design a custom automation architecture.' },
  { n: '02', title: 'Train & Integrate', body: 'We build the models, train them on your specific data, and seamlessly plug them into your existing software stack.' },
  { n: '03', title: 'Deploy & Scale', body: 'The system goes live. You immediately reclaim hundreds of manual hours, drop overhead costs, and scale your output without scaling your payroll.' },
];

function HowItWorks() {
  return (
    <section style={{ position: 'relative', padding: '120px 48px', overflow: 'hidden' }}>
      {/* Elliptical glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', height: '60%', background: `radial-gradient(ellipse, ${C.blob1}55 0%, ${C.blob3}33 50%, transparent 80%)`, pointerEvents: 'none', borderRadius: '50%', filter: 'blur(40px)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: C.ink, textAlign: 'center', marginBottom: 80, letterSpacing: '-0.02em' }}>
            How We Deploy
          </h2>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.12}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(16px)', border: `1px solid ${C.border}`, borderRadius: 24, padding: '40px 32px' }}>
                <div style={{ width: 48, height: 48, background: C.ink, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <span style={{ fontSize: '0.9rem', color: C.pillText, fontWeight: 500 }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: C.ink, marginBottom: 14, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: C.inkLight, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Use Cases ─────────────────────────────────────────────────── */
const useCases = [
  { title: "Legal & Compliance", body: "Automated contract parsing, risk analysis, and document generation. Let your partners practice law, not paperwork." },
  { title: "Manufacturing & Supply", body: "Predictive inventory modeling and automated vendor communications. Eliminate supply chain friction." },
  { title: "Tech & Agencies", body: "Outsourced AI development. We act as your elite shadow-team to deploy complex AI features into your existing products." },
  { title: "Financial & Lending", body: "Automated underwriting data extraction and risk-scoring pipelines. Faster decisions, zero manual entry." }
];

function Gallery() {
  return (
    <section style={{ padding: '100px 0', borderTop: `1px solid ${C.border}` }}>
      <FadeUp>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 400, color: C.ink, textAlign: 'center', maxWidth: 760, margin: '0 auto 64px', padding: '0 24px', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
          Engineered for high-stakes environments where precision is non-negotiable.
        </h2>
      </FadeUp>

      {/* Scrolling portrait grid */}
      <div style={{ display: 'flex', gap: 20, padding: '0 48px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {useCases.map((useCase, i) => (
          <motion.div key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            style={{ flexShrink: 0, width: 300, minHeight: 280, borderRadius: 20, background: i % 3 === 0 ? `linear-gradient(145deg, ${C.blob1}, ${C.blob2})` : i % 3 === 1 ? `linear-gradient(145deg, ${C.blob2}, ${C.blob3})` : `linear-gradient(145deg, ${C.blob3}, ${C.blob1})`, border: `1px solid ${C.border}`, padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: C.ink, marginBottom: 16, lineHeight: 1.3 }}>{useCase.title}</h3>
            <p style={{ fontSize: '0.95rem', color: C.inkLight, lineHeight: 1.6, margin: 0 }}>{useCase.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA cards ──────────────────────────────────────────────── */
function CTACards() {
  const [email2, setEmail2] = useState('');
  return (
    <section style={{ padding: '80px 48px 60px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
        {/* Journey card */}
        <FadeUp>
          <div style={{ background: C.card, borderRadius: 28, padding: '52px 48px', height: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 400, color: C.ink, marginBottom: 32, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
              Stop scaling your payroll. Scale your systems.
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/contact?email=${encodeURIComponent(email2)}&type=consultation`; }}
              style={{ display: 'flex', alignItems: 'center', background: '#fff', border: `1px solid ${C.border}`, borderRadius: '999px', padding: '6px 6px 6px 20px', marginBottom: 28 }}>
              <input type="email" placeholder="Enter your email to request a consultation" value={email2} onChange={(e) => setEmail2(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '0.86rem', color: C.ink, fontFamily: 'inherit' }} />
              <button type="submit"
                style={{ width: 40, height: 40, borderRadius: '50%', background: C.pill, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.pillText} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </form>
            <div style={{ display: 'flex', gap: 16 }}>
              {['𝕏', 'Instagram'].map((s) => (
                <a key={s} href="#" style={{ fontSize: '0.8rem', color: C.inkLight, textDecoration: 'none', fontWeight: 500 }}>{s}</a>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Work card */}
        <FadeUp delay={0.1}>
          <div style={{ background: C.card, borderRadius: 28, padding: '52px 48px', height: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 400, color: C.ink, marginBottom: 32, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
              Ready to automate your operations?
            </h3>
            <a href="mailto:hello@oakrootsolutions.com"
              style={{ display: 'inline-block', fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', fontWeight: 400, color: C.ink, textDecoration: 'underline', textUnderlineOffset: 6, wordBreak: 'break-all', lineHeight: 1.4 }}>
              hello@oakrootsolutions.com
            </a>
          </div>
        </FadeUp>
      </div>


    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function AIPage() {
  return (
    <>
      <Head>
        <title>AI — Oakroot Solutions</title>
        <meta name="description" content="The future of beauty is automated. Discover Oakroot's AI-powered innovation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'var(--font-inter), sans-serif', color: C.ink }}>
        <Hero />
        <Pillars />
        <Vision />
        <HowItWorks />
        <Gallery />
        <CTACards />
      </div>
    </>
  );
}
