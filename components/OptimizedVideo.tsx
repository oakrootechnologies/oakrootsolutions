/**
 * OptimizedVideo - Production-ready video component with lazy loading,
 * poster placeholders, and IntersectionObserver-based viewport detection.
 * 
 * Features:
 * - Lazy loading: video src only loads when near viewport
 * - Poster image support with play overlay
 * - HLS fallback support (documented, no third-party libs by default)
 * - Autoplay with muted (browser-compliant)
 * - Preload control (metadata/none)
 * 
 * @example
 * ```tsx
 * // Lazy-loaded video
 * <OptimizedVideo
 *   src="/video.mp4"
 *   poster="/poster.jpg"
 *   lazy
 *   controls
 * />
 * 
 * // Autoplay hero video
 * <OptimizedVideo
 *   src="/hero.mp4"
 *   poster="/hero-poster.jpg"
 *   autoplay
 *   muted
 *   loop
 *   playsInline
 * />
 * ```
 */

'use client';

import { useRef, useEffect, useState, VideoHTMLAttributes } from 'react';
import { useInView } from '@/utils/useInView';
import Image from 'next/image';

export interface OptimizedVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster'> {
  src: string | string[]; // Single source or array for multiple formats
  poster?: string;
  type?: string | string[]; // MIME type(s) matching src array
  preload?: 'metadata' | 'none' | 'auto';
  lazy?: boolean; // Enable lazy loading via IntersectionObserver
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  className?: string;
  // HLS support (requires hls.js library - see docs)
  hlsConfig?: {
    enabled: boolean;
    // Additional hls.js config options would go here
  };
}

export default function OptimizedVideo({
  src,
  poster,
  type,
  preload = 'metadata',
  lazy = false,
  controls = true,
  autoplay = false,
  muted = autoplay, // Autoplay requires muted
  loop = false,
  playsInline = true,
  className,
  hlsConfig,
  ...rest
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(!!poster);
  const [mounted, setMounted] = useState(false);

  // Use IntersectionObserver hook for lazy loading
  const [ref, isInView] = useInView(
    {
      threshold: 0.1,
      rootMargin: '100px', // Start loading 100px before entering viewport
    },
    false
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger load when in view (for lazy loading)
  useEffect(() => {
    if (lazy && isInView && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [lazy, isInView, shouldLoad]);

  // Set video ref for IntersectionObserver
  useEffect(() => {
    if (videoRef.current) {
      ref(videoRef.current);
    }
  }, [ref]);

  // Handle video play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mounted) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPoster(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (poster) {
        setShowPoster(true);
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [mounted, poster]);

  // HLS support (requires hls.js - see README for setup)
  useEffect(() => {
    if (!hlsConfig?.enabled || !shouldLoad || typeof window === 'undefined') return;

    // Check if src is HLS (.m3u8)
    const srcArray = Array.isArray(src) ? src : [src];
    const isHLS = srcArray.some((s) => typeof s === 'string' && s.includes('.m3u8'));

    if (isHLS) {
      // Dynamic import of hls.js (only if needed)
      // Note: hls.js must be installed: npm install hls.js
      import('hls.js')
        .then((Hls) => {
          const video = videoRef.current;
          if (!video) return;

          if (Hls.default.isSupported()) {
            const hls = new Hls.default();
            hls.loadSource(srcArray[0] as string);
            hls.attachMedia(video);
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            video.src = srcArray[0] as string;
          }
        })
        .catch(() => {
          // Silently fail if hls.js is not installed
          // Fallback to native video element
          const video = videoRef.current;
          if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = srcArray[0] as string;
          }
        });
    }
  }, [hlsConfig, shouldLoad, src]);

  // Normalize src to array
  const srcArray = Array.isArray(src) ? src : [src];
  const typeArray = Array.isArray(type) ? type : type ? [type] : srcArray.map(() => 'video/mp4');

  // Play button overlay handler
  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => {
        console.warn('Video play failed:', err);
      });
    }
  };

  if (!mounted) {
    // SSR fallback: show poster if available
    return poster ? (
      <div className={`relative ${className || ''}`} style={{ aspectRatio: '16/9' }}>
        <Image
          src={poster}
          alt="Video poster"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    ) : (
      <div className={`bg-gray-200 ${className || ''}`} style={{ aspectRatio: '16/9' }} />
    );
  }

  return (
    <div className={`relative ${className || ''}`}>
      {/* Video element - only set src when shouldLoad is true */}
      <video
        ref={videoRef}
        poster={poster}
        preload={lazy ? 'none' : preload}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className="w-full h-auto"
        {...rest}
      >
        {shouldLoad &&
          srcArray.map((source, index) => (
            <source
              key={index}
              src={typeof source === 'string' ? source : ''}
              type={typeArray[index] || 'video/mp4'}
            />
          ))}
        Your browser does not support the video tag.
      </video>

      {/* Poster overlay with play button */}
      {showPoster && poster && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer transition-opacity hover:bg-opacity-40"
          onClick={handlePlayClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePlayClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Play video"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-black ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

