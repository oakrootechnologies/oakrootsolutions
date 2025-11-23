import Head from 'next/head';
import dynamic from 'next/dynamic';
import AnimatedTextHero from '@/components/AnimatedTextHero';
import BrandStrip from '@/components/BrandStrip';
import HeroSection from '@/components/HeroSection';
import OurServicesSection from '@/components/OurServicesSection';
import OurClientsSection from '@/components/OurClientsSection';
import OptimizedImage from '@/components/OptimizedImage';
import OptimizedVideo from '@/components/OptimizedVideo';

// Lazy load heavy components for better performance
const ServicesFlowSection = dynamic(() => import('@/components/ServicesFlowSection'), {
  ssr: true,
  loading: () => <div className="w-full h-[500px] bg-white" />,
});

const CylinderPosters = dynamic(() => import('@/components/CylinderPosters'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white" />,
});

const TiltedMarquee = dynamic(() => import('@/components/TiltedMarquee'), {
  ssr: true,
  loading: () => <div className="w-full h-[200px] bg-white" />,
});

const TestimonialsSlider = dynamic(() => import('@/components/TestimonialsSlider'), {
  ssr: true,
  loading: () => <div className="w-full h-[600px] bg-white" />,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Oakroot Solutions – The Best for Your Business</title>
        <meta
          name="description"
          content="Oakroot Solutions – The Best for Your Business. We help brands grow with creative strategy, performance marketing, and world-class digital execution."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://oakrootsolutions.com/" />
        
        {/* Performance: Preload critical hero video for LCP */}
        <link rel="preload" as="video" href="/videos/hero-video.mp4" type="video/mp4" />
        <link rel="preload" as="image" href="/videos/hero-video-poster.jpg" />
      </Head>
      
      <div className="min-h-screen bg-white text-black">
        {/* Animated Text Hero Section - First section with video background */}
        <AnimatedTextHero />

        {/* Brand Strip Section - Black strip with white text */}
        <BrandStrip />

        {/* Hero Section */}
        <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48">
          <HeroSection />
        </div>

        {/* Services Flow Section */}
        <ServicesFlowSection />

        {/* Spacer between sections */}
        <div className="h-16 lg:h-24" />

        {/* Cylinder Posters Section */}
        <CylinderPosters
          images={[
            {
              id: 'restworld',
              src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
              alt: 'Restworld - E-commerce platform',
              link: 'https://restworld.in/',
            },
            {
              id: 'wittywealth',
              src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
              alt: 'Witty Wealth - Fintech platform',
              link: 'https://wittywealth.org/',
            },
            {
              id: 'ideaascend',
              src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
              alt: 'Idea Ascend - Startup platform',
              link: 'https://ideaascend.in/',
            },
            {
              id: 'oksingreen',
              src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
              alt: 'Oksingreen - Horticulture platform',
              link: 'https://oksingreen.com/',
            },
            {
              id: 'web-design',
              src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
              alt: 'Web Design Project',
              link: '/projects',
            },
            {
              id: 'branding',
              src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
              alt: 'Branding Project',
              link: '/projects',
            },
            {
              id: 'digital-marketing',
              src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
              alt: 'Digital Marketing Project',
              link: '/projects',
            },
            {
              id: 'app-development',
              src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
              alt: 'App Development Project',
              link: '/projects',
            },
            {
              id: 'graphic-design',
              src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
              alt: 'Graphic Design Project',
              link: '/projects',
            },
            {
              id: 'video-production',
              src: 'https://images.unsplash.com/photo-1487958449943-2429e8d86256?w=800&h=600&fit=crop',
              alt: 'Video Production Project',
              link: '/projects',
            },
            {
              id: 'ui-ux-design',
              src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
              alt: 'UI/UX Design Project',
              link: '/projects',
            },
            {
              id: 'ai-automation',
              src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
              alt: 'AI Automation Project',
              link: '/projects',
            },
          ]}
          numPanels={20}
          panelWidthPx={320}
          panelRatio={0.75}
          autoRotateDegPerSec={8}
          spacingFactor={0.995}
          maxBendDeg={6}
          initialRotationDeg={0}
        />

        {/* Spacer between sections */}
        <div className="h-16 lg:h-24" />

        {/* Our Services Section */}
        <OurServicesSection />

        {/* Tilted Marquee Section */}
        <TiltedMarquee />

        {/* Our Clients Section */}
        <OurClientsSection />

        {/* Testimonials Slider Section */}
        <TestimonialsSlider />

        {/* Performance Demo Section - Showcasing OptimizedImage and OptimizedVideo */}
        <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Performance Optimized Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* OptimizedImage Example - Hero LCP Image */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Optimized Hero Image (LCP)</h3>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Optimized hero image example"
                width={800}
                height={600}
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="mt-2 text-sm text-gray-600">
                Priority image with AVIF/WebP fallbacks, blur placeholder, and fetchpriority="high"
              </p>
            </div>

            {/* OptimizedImage Example - Content Image */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Lazy-Loaded Content Image</h3>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Lazy loaded content image"
                width={800}
                height={600}
                placeholder="lqip"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="mt-2 text-sm text-gray-600">
                Lazy-loaded with LQIP placeholder, automatic format optimization
              </p>
            </div>
          </div>

          {/* OptimizedVideo Example - Lazy Loaded */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Lazy-Loaded Video (scroll to load)</h3>
            <OptimizedVideo
              src="/videos/hero-video.mp4"
              poster="/videos/hero-video-poster.jpg"
              type="video/mp4"
              controls
              lazy
              preload="none"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            />
            <p className="mt-2 text-sm text-gray-600 text-center">
              Video loads only when scrolled into viewport (100px margin). Poster shown until play.
            </p>
          </div>
        </section>

        {/* Spacer for scrolling demonstration */}
        <div className="h-[50vh] lg:h-screen bg-white"></div>
      </div>
    </>
  );
}

