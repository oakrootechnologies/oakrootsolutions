import Head from 'next/head';
import dynamic from 'next/dynamic';
import AnimatedTextHero from '@/components/AnimatedTextHero';
import BrandStrip from '@/components/BrandStrip';
import HeroSection from '@/components/HeroSection';
import OurServicesSection from '@/components/OurServicesSection';
import OurClientsSection from '@/components/OurClientsSection';

// Lazy load heavy components for better performance
const ServicesFlowSection = dynamic(() => import('@/components/ServicesFlowSection'), {
  ssr: true,
  loading: () => <div className="w-full h-[500px] bg-white" />,
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

        {/* Our Services Section */}
        <OurServicesSection />

        {/* Tilted Marquee Section */}
        <TiltedMarquee />

        {/* Our Clients Section */}
        <OurClientsSection />

        {/* Testimonials Slider Section */}
        <TestimonialsSlider />

        {/* Spacer for scrolling demonstration */}
        <div className="h-[50vh] lg:h-screen bg-white"></div>
      </div>
    </>
  );
}

