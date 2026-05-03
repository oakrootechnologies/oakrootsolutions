import Head from 'next/head';
import dynamic from 'next/dynamic';
import AnimatedTextHero from '@/components/AnimatedTextHero';
import BrandStrip from '@/components/BrandStrip';
import HeroSection from '@/components/HeroSection';
import OurServicesSection from '@/components/OurServicesSection';
import OurClientsSection from '@/components/OurClientsSection';
import AwesomeWorksSection from '@/components/AwesomeWorksSection';
// Static imports — SSR-safe, no browser-only APIs, no hydration risk
import ServicesFlowSection from '@/components/ServicesFlowSection';
import TiltedMarquee from '@/components/TiltedMarquee';
import TestimonialsSlider from '@/components/TestimonialsSlider';

// Three.js components: must be ssr:false (WebGL = browser only)
// next/dynamic options must be static object literals (webpack build-time analysis)
const BentCarouselSection = dynamic(
  () => import('@/components/BentCarouselSection'),
  {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '100vh', background: '#fff' }} />,
  }
);

/* const CausticsGlassSection = dynamic(
  () => import('@/components/CausticsGlassSection'),
  {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '100vh', background: '#f0f0f0' }} />,
  }
); */

const GlobeWidget = dynamic(
  () => import('@/components/GlobeWidget'),
  {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '700px', background: 'transparent' }} />,
  }
);

const ParallaxProjectGallery = dynamic(
  () => import('@/components/ParallaxProjectGallery'),
  {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '600px', background: '#F5F4F0' }} />,
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
        <link rel="preload" as="video" href="/videos/new-hero.mp4" type="video/mp4" />
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

        {/* 3D Bent Card Carousel — ssr:false handles client-only, no ClientOnly needed */}
        <BentCarouselSection />

        {/* Services Flow Section — "How We Work" header */}
        <ServicesFlowSection />

        {/* Parallax Diagonal Stack Gallery — Case Study cards */}
        <ParallaxProjectGallery />

        {/* Tilted Marquee Section */}
        <TiltedMarquee />

        {/* Our Clients Section */}
        <OurClientsSection />

        {/* Globe Component */}
        <GlobeWidget />

        {/* Testimonials Slider Section */}
        <TestimonialsSlider />

        {/* Caustics Glass Scene Section - Just above footer */}
        {/* <CausticsGlassSection /> */}
      </div>
    </>
  );
}

