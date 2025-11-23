/**
 * OptimizedImage - Production-ready image component with AVIF/WebP fallbacks,
 * lazy loading, blur placeholders, and automatic format optimization.
 * 
 * Wraps next/image with additional features:
 * - Automatic AVIF/WebP format fallbacks via <picture> element
 * - Lazy loading with native loading="lazy" for non-priority images
 * - Blur-up placeholders (LQIP) with inline SVG fallback
 * - fetchpriority="high" for LCP images
 * - Responsive sizes and aspect-ratio support
 * 
 * @example
 * ```tsx
 * // Hero image (LCP candidate)
 * <OptimizedImage
 *   src="/hero.jpg"
 *   alt="Hero image"
 *   priority
 *   width={1920}
 *   height={1080}
 *   placeholder="blur"
 *   blurDataURL="data:image/svg+xml..."
 * />
 * 
 * // Content image (lazy loaded)
 * <OptimizedImage
 *   src="https://images.unsplash.com/photo-123"
 *   alt="Content"
 *   width={800}
 *   height={600}
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 * ```
 */

import Image, { ImageProps, StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
  alt: string;
  priority?: boolean;
  placeholder?: 'blur' | 'lqip' | 'empty';
  blurDataURL?: string;
  aspectRatio?: string; // CSS aspect-ratio value (e.g., "16/9", "1")
  responsiveBreakpoints?: number[]; // Custom breakpoints for srcset
  sizes?: string; // Responsive sizes attribute
  // CDN configuration for external images
  cdnConfig?: {
    provider: 'cloudinary' | 'imgix' | 'fastly' | 'custom';
    baseUrl?: string;
    params?: Record<string, string>;
  };
}

// Generate a tiny inline SVG placeholder (LQIP fallback)
const generateLQIP = (width: number = 20, height: number = 20): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="system-ui" font-size="10" fill="#9ca3af" text-anchor="middle" dy=".3em">Loading...</text>
    </svg>
  `.trim();
  // Use encodeURIComponent for browser compatibility (no Buffer in browser)
  if (typeof window !== 'undefined') {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
  // Node.js fallback (SSR)
  try {
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  } catch {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
};

// Check if URL is external (not starting with / or data:)
const isExternalUrl = (url: string | StaticImageData): boolean => {
  if (typeof url !== 'string') return false;
  return !url.startsWith('/') && !url.startsWith('data:');
};

// Generate CDN URL with format conversion
const getCdnUrl = (
  src: string,
  format: 'avif' | 'webp' | 'original',
  cdnConfig?: OptimizedImageProps['cdnConfig']
): string => {
  if (!cdnConfig || !isExternalUrl(src)) return src;

  const { provider, baseUrl, params = {} } = cdnConfig;

  switch (provider) {
    case 'cloudinary':
      // Cloudinary format: f_avif or f_webp
      const cloudinaryFormat = format === 'avif' ? 'f_avif' : format === 'webp' ? 'f_webp' : '';
      const cloudinaryParams = new URLSearchParams({
        ...params,
        ...(cloudinaryFormat && { [cloudinaryFormat]: 'auto' }),
      });
      return `${baseUrl || src}?${cloudinaryParams.toString()}`;
    
    case 'imgix':
      // Imgix format: fm=avif or fm=webp
      const imgixFormat = format === 'avif' ? 'avif' : format === 'webp' ? 'webp' : 'auto';
      const imgixParams = new URLSearchParams({
        ...params,
        fm: imgixFormat,
      });
      return `${baseUrl || src}?${imgixParams.toString()}`;
    
    case 'fastly':
      // Fastly Image Optimization API
      const fastlyParams = new URLSearchParams({
        ...params,
        ...(format !== 'original' && { format }),
      });
      return `${baseUrl || src}?${fastlyParams.toString()}`;
    
    default:
      return src;
  }
};

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  placeholder = 'lqip',
  blurDataURL,
  aspectRatio,
  responsiveBreakpoints,
  sizes,
  width,
  height,
  className,
  style,
  cdnConfig,
  ...rest
}: OptimizedImageProps) {
  const [mounted, setMounted] = useState(false);
  const [blurPlaceholder, setBlurPlaceholder] = useState<string | undefined>(blurDataURL);

  useEffect(() => {
    setMounted(true);
    // Generate LQIP if not provided and placeholder is requested
    if (!blurDataURL && placeholder !== 'empty' && width && height) {
      setBlurPlaceholder(generateLQIP(Number(width), Number(height)));
    }
  }, [blurDataURL, placeholder, width, height]);

  const isExternal = typeof src === 'string' && isExternalUrl(src);
  const shouldUsePicture = isExternal && cdnConfig; // Use <picture> for external CDN images

  // Compute responsive sizes
  const computedSizes = sizes || (width ? `(max-width: 768px) 100vw, ${width}px` : '100vw');

  // Merge styles with aspect-ratio if provided
  const mergedStyle = {
    ...style,
    ...(aspectRatio && { aspectRatio }),
  };

  // Base Image component props
  const imageProps: ImageProps = {
    src,
    alt,
    width: width || 800,
    height: height || 600,
    priority,
    loading: priority ? undefined : ('lazy' as const),
    decoding: 'async' as const,
    sizes: computedSizes,
    className,
    style: mergedStyle,
    ...(placeholder !== 'empty' && blurPlaceholder && {
      placeholder: 'blur' as const,
      blurDataURL: blurPlaceholder,
    }),
    ...rest,
  };

  // Add fetchpriority for priority images (LCP candidates)
  if (priority && mounted) {
    (imageProps as any).fetchPriority = 'high';
  }

  // For external CDN images with format support, use <picture> element
  if (shouldUsePicture && typeof src === 'string') {
    return (
      <picture className={className} style={mergedStyle}>
        {/* AVIF source */}
        <source
          type="image/avif"
          srcSet={getCdnUrl(src, 'avif', cdnConfig)}
        />
        {/* WebP source */}
        <source
          type="image/webp"
          srcSet={getCdnUrl(src, 'webp', cdnConfig)}
        />
        {/* Fallback to next/image */}
        <Image {...imageProps} />
      </picture>
    );
  }

  // Standard next/image for internal images or when no CDN config
  return <Image {...imageProps} />;
}

