/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
    ],
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

module.exports = nextConfig

