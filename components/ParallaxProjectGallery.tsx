'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/* ─── Project images ─────────────────────────────────────────────── */
const stackImages = [
  {
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&h=640&fit=crop',
    label: 'Restworld',
    tag: 'Brand Identity',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=640&fit=crop',
    label: 'Witty Wealth',
    tag: 'Fintech App',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=640&fit=crop',
    label: 'Idea Ascend',
    tag: 'Web Platform',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=640&fit=crop',
    label: 'Oksingreen',
    tag: 'Workspace',
  },
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=640&fit=crop',
    label: 'Urban Flow',
    tag: 'Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=640&fit=crop',
    label: 'EcoSmart',
    tag: 'AI Product',
  },
];

/* ─── Geometry constants ─────────────────────────────────────────── */
const CARD_W  = 476;  // px — 40% larger than original 340
const CARD_H  = 322;  // px — 40% larger than original 230
const STEP_X  = 118;  // px rightward per card — enough to show ~25% of each
const STEP_Y  = -100; // px upward per card — clear diagonal fan

// Diagonal scroll direction matches the stack's own axis (bottom-left → top-right)
const DIAG_X  = 0.76;
const DIAG_Y  = -0.65;
const TRAVEL  = 280;  // total diagonal travel in px

export default function ParallaxProjectGallery() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  /* ── Scroll: whole stack drifts diagonally ──────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const stackX = useTransform(scrollYProgress, [0, 1], [ DIAG_X * TRAVEL, -DIAG_X * TRAVEL]);
  const stackY = useTransform(scrollYProgress, [0, 1], [ DIAG_Y * TRAVEL, -DIAG_Y * TRAVEL]);

  /* ── Derived sizes ──────────────────────────────────────────────── */
  const totalW = CARD_W + STEP_X * (stackImages.length - 1);
  const totalH = CARD_H + Math.abs(STEP_Y) * (stackImages.length - 1);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '90vh',
        background: '#F5F4F0',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
      }}
    >
      {/* ── 3D Stage ────────────────────────────────────────────────── */}
      <div
        style={{
          perspective: '1100px',
          // Vanishing point shifted left to complement right-edge-forward tilt
          perspectiveOrigin: '40% 50%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Scroll-drift wrapper */}
        <motion.div
          style={{
            position: 'relative',
            width:  totalW,
            height: totalH,
            x: stackX,
            y: stackY,
          }}
        >
          {stackImages.map((img, i) => {
            const isHovered = hovered === i;

            // Place each card: step right (+X) and up (-Y) in the stack
            const left    = i * STEP_X;
            const top     = (stackImages.length - 1 - i) * Math.abs(STEP_Y);
            const zIndex  = isHovered ? 50 : stackImages.length - i;

            return (
              <motion.div
                key={img.label}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={()  => setHovered(null)}
                animate={{
                  x:      isHovered ? 160 : 0,
                  scale:  isHovered ? 1.05 : 1,
                  zIndex,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width:        CARD_W,
                  height:       CARD_H,
                  borderRadius: 0,         // sharp / "pointy" corners
                  overflow:     'hidden',
                  cursor:       'pointer',
                  // Right edge toward viewer, left edge recedes into screen
                  rotateX:  8,
                  rotateY: -30,
                  rotateZ:  3,
                  transformStyle: 'preserve-3d',
                  boxShadow: isHovered
                    ? '0 40px 100px rgba(0,0,0,0.5)'
                    : `0 ${6 + i * 3}px ${24 + i * 10}px rgba(0,0,0,0.25)`,
                }}
              >
                {/* ── Project image ──────────────────────────────── */}
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 476px"
                  unoptimized
                  style={{
                    transition: 'transform 0.55s ease',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  }}
                />

                {/* ── Glass transparency overlay (stacking effect) ── */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    // Frosted-glass tint — lighter on hover, heavier when buried
                    background: isHovered
                      ? 'rgba(255,255,255,0.04)'
                      : `rgba(245,244,240,${0.08 + i * 0.04})`,
                    backdropFilter: 'blur(0px)',
                    transition: 'background 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* ── Bottom gradient for label readability ─────────── */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isHovered
                      ? 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)',
                    transition: 'background 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* ── Card label ─────────────────────────────────────── */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 18,
                    right: 18,
                    opacity: isHovered ? 1 : 0.5,
                    transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.35s, transform 0.35s',
                    pointerEvents: 'none',
                  }}
                >
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      margin: 0,
                      marginBottom: 4,
                    }}
                  >
                    {img.tag}
                  </p>
                  <p
                    style={{
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 700,
                      margin: 0,
                      letterSpacing: '-0.01em',
                      textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                    }}
                  >
                    {img.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
