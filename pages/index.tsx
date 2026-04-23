import Head from 'next/head';
import AnimatedTextHero from '@/components/AnimatedTextHero';
import BrandStrip from '@/components/BrandStrip';
import HeroSection from '@/components/HeroSection';
import OurServicesSection from '@/components/OurServicesSection';
import OurClientsSection from '@/components/OurClientsSection';
import AwesomeWorksSection from '@/components/AwesomeWorksSection';
import { createLazyLoad } from '@/utils/lazyLoad';

// Lazy load heavy components for better performance with optimized loading states
const ServicesFlowSection = createLazyLoad(
  () => import('@/components/ServicesFlowSection'),
  {
    ssr: true,
    priority: 'low',
    fallback: <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-white" />,
  }
);

const TiltedMarquee = createLazyLoad(
  () => import('@/components/TiltedMarquee'),
  {
    ssr: true,
    priority: 'low',
    fallback: <div className="w-full h-[150px] sm:h-[200px] md:h-[250px] bg-white" />,
  }
);

const TestimonialsSlider = createLazyLoad(
  () => import('@/components/TestimonialsSlider'),
  {
    ssr: true,
    priority: 'low',
    fallback: <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] bg-white" />,
  }
);

// 3D components - no SSR for better performance
const BentCarouselSection = createLazyLoad(
  () => import('@/components/BentCarouselSection'),
  {
    ssr: false,
    priority: 'low',
    fallback: <div className="w-full h-screen bg-white" />,
  }
);

const CausticsGlassSection = createLazyLoad(
  () => import('@/components/CausticsGlassSection'),
  {
    ssr: false,
    priority: 'low',
    fallback: <div className="w-full h-screen bg-[#f0f0f0]" />,
  }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Oakroot Solutions – SECURE. SCALABLE. SOVEREIGN.</title>
        <meta
          name="description"
          content="Oakroot Solutions – SECURE. SCALABLE. SOVEREIGN. We help brands grow with creative strategy, performance marketing, and world-class digital execution."
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

        {/* Our Services Section - "We build your entire digital ecosystem." */}
        <OurServicesSection />

        {/* Awesome Works Portfolio Grid */}
        <AwesomeWorksSection />

        {/* Brand Strip Section - "Elevate Your Brand with Oakroot" */}
        <BrandStrip />

        {/* Hero Section */}
        <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48">
          <HeroSection />
        </div>

        {/* 3D Bent Card Carousel Section */}
        <BentCarouselSection />

        {/* Services Flow Section */}
        <ServicesFlowSection />

        {/* Tilted Marquee Section */}
        <TiltedMarquee />

        {/* Our Clients Section */}
        <OurClientsSection />

        {/* Testimonials Slider Section */}
        <TestimonialsSlider />

        {/* Caustics Glass Scene Section - Just above footer */}
        <CausticsGlassSection />
      </div>
    </>
  );
}

