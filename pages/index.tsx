import Head from 'next/head';
import AnimatedTextHero from '@/components/AnimatedTextHero';
import BrandStrip from '@/components/BrandStrip';
import HeroSection from '@/components/HeroSection';
import ServicesFlowSection from '@/components/ServicesFlowSection';
import OurServicesSection from '@/components/OurServicesSection';
import TiltedMarquee from '@/components/TiltedMarquee';
import OurClientsSection from '@/components/OurClientsSection';
import TestimonialsSlider from '@/components/TestimonialsSlider';

export default function Home() {
  return (
    <>
      <Head>
        <title>Oakroot - Creative Strategy & Conversion-Focused Marketing</title>
        <meta name="description" content="Elevating brands through creative strategy and conversion-focused marketing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
        <div className="h-screen bg-white"></div>
      </div>
    </>
  );
}

