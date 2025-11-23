/** @type {import('next').NextConfig} */
// Optional: Bundle analyzer (uncomment to enable)
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Enable AVIF and WebP formats for automatic optimization
    formats: ['image/avif', 'image/webp'],
    // Remote image patterns (CDN domains)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Add your CDN domains here (Cloudinary, Imgix, etc.)
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache optimized images for 60 seconds
  },
  // HTTP headers for caching and security
  async headers() {
    return [
      {
        // Apply caching headers to static assets
        source: '/:path*\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot|mp4|webm|mp3|ogg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts with long TTL
        source: '/:path*\\.(woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        // HTML caching - shorter TTL with revalidation
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect www to non-www (canonical host)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.oakrootsolutions.com',
          },
        ],
        destination: 'https://oakrootsolutions.com/:path*',
        permanent: true,
      },
      // Redirect http to https
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'oakrootsolutions.com',
          },
        ],
        missing: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'https',
          },
        ],
        destination: 'https://oakrootsolutions.com/:path*',
        permanent: true,
      },
    ];
  },
}

// Uncomment to enable bundle analyzer:
// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig

