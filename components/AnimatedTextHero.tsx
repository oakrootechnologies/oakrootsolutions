'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { VideoText } from '@/components/ui/video-text';

// ─── Stages ───────────────────────────────────────────────────────────────────
// video    → full-screen video plays
// shrinking→ clip-path circle animates 150%→55px (2 s)
// reveal   → circle fades out, VideoText OAKROOT fades in (1.5 s hold)
// done     → overlay fades out, persistent section takes over
type IntroStage = 'video' | 'shrinking' | 'reveal' | 'done';

const VIDEO_SRC = '/videos/new-hero.mp4';
// Note: NO single-quotes inside fontFamily — they break SVG attribute parsing
const FONT_FAMILY = 'Inter, Helvetica Neue, Arial, sans-serif';

export default function AnimatedTextHero() {
  const [mounted, setMounted] = useState(false);
  const [stage,   setStage]   = useState<IntroStage>('video');

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── mount + scroll lock ────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow            = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if ((window as any).lenis) (window as any).lenis.stop();

    // Safety: force shrink if video never triggers it
    const safety = setTimeout(() => {
      setStage(prev => prev === 'video' ? 'shrinking' : prev);
    }, 8000);

    return () => {
      document.body.style.overflow            = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
      clearTimeout(safety);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ─── stage transitions ──────────────────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (stage === 'shrinking') {
      // 2 s = duration of clip-path animation, then show video-text
      timerRef.current = setTimeout(() => setStage('reveal'), 2000);
    }

    if (stage === 'reveal') {
      // Hold the video-in-text effect for 1.8 s, then exit
      timerRef.current = setTimeout(() => {
        setStage('done');
        document.body.style.overflow            = '';
        document.documentElement.style.overflow = '';
        if ((window as any).lenis) (window as any).lenis.start();
      }, 1800);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // ─── video handlers ─────────────────────────────────────────────────────────
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration > 0 && v.currentTime >= v.duration - 2 && stage === 'video') {
      setStage('shrinking');
    }
  };
  const handleVideoEnded = () => {
    if (stage === 'video') setStage('shrinking');
  };

  const clipFull   = 'circle(150% at 50% 50%)';
  const clipCircle = 'circle(55px at 50% 50%)';

  return (
    <>
      {/* ══ PERSISTENT HERO — always in DOM, revealed when overlay exits ═══════*/}
      <section className="w-full h-screen flex flex-col items-center justify-center bg-white select-none gap-8">

        {/* OAKROOT wordmark
            SSR → static text (matches server HTML exactly, no hydration mismatch)
            Client → VideoText with video playing inside the letter masks           */}
        <div
          suppressHydrationWarning
          style={{ position: 'relative', width: '100%', maxWidth: 1000, height: 200, padding: '0 24px', boxSizing: 'border-box' }}
        >
          {mounted ? (
            <VideoText
              src={VIDEO_SRC}
              fontSize={15}
              fontWeight="800"
              fontFamily={FONT_FAMILY}
              loop muted autoPlay preload="auto"
            >
              OAKROOT
            </VideoText>
          ) : (
            /* SSR fallback — same visual weight, zero browser API usage */
            <div
              style={{
                position:      'absolute',
                inset:         0,
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
              }}
            >
              <span
                style={{
                  fontFamily:    FONT_FAMILY,
                  fontWeight:    800,
                  fontSize:      'clamp(3.5rem, 15vw, 12rem)',
                  lineHeight:    1,
                  letterSpacing: '0.03em',
                  color:         '#000000',
                }}
              >
                OAKROOT
              </span>
            </div>
          )}
        </div>

        {/* Tagline — fades in after overlay exits */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: stage === 'done' ? 1 : 0, y: stage === 'done' ? 0 : 12 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <p style={{ fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: '0.95rem', letterSpacing: '0.18em', color: '#6b7280', textTransform: 'uppercase' }}>
            Oakroot Solutions
          </p>
          <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: '1rem', letterSpacing: '0.22em', color: '#000', textTransform: 'uppercase' }}>
            SECURE.&nbsp; SCALABLE.&nbsp; SOVEREIGN.
          </p>
        </motion.div>
      </section>

      {/* ══ INTRO OVERLAY — client-only, fixed on top ════════════════════════*/}
      {mounted && (
        <AnimatePresence>
          {stage !== 'done' && (
            <motion.div
              key="intro"
              className="fixed inset-0 z-[9999] bg-white"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            >
              {/* ── Full-screen video with shrinking circle clip-path ── */}
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: clipFull, opacity: 1 }}
                animate={{
                  clipPath: stage === 'video' ? clipFull : clipCircle,
                  // fade out the circle once reveal stage kicks in
                  opacity:  stage === 'reveal' ? 0 : 1,
                }}
                transition={{
                  clipPath: { duration: 2,   ease: [0.76, 0, 0.24, 1] },
                  opacity:  { duration: 0.4, ease: 'easeOut' },
                }}
              >
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  autoPlay muted playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </motion.div>

              {/* ── VideoText OAKROOT — fades in at reveal stage ── */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === 'reveal' ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeIn' }}
              >
                <div style={{ position: 'relative', width: '100%', maxWidth: 1000, height: 200, padding: '0 24px', boxSizing: 'border-box' }}>
                  <VideoText
                    src={VIDEO_SRC}
                    fontSize={15}
                    fontWeight="800"
                    fontFamily={FONT_FAMILY}
                    loop muted autoPlay preload="auto"
                  >
                    OAKROOT
                  </VideoText>
                </div>
              </motion.div>

              {/* ── Scroll hint during video phase ── */}
              <AnimatePresence>
                {stage === 'video' && (
                  <motion.div
                    key="scroll"
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                    >
                      <div className="w-1 h-2 bg-white/50 rounded-full" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
