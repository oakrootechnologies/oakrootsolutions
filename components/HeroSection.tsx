import dynamic from 'next/dynamic';
import ContentColumn from './ContentColumn';

// Three.js/R3F MUST be dynamically imported with ssr:false.
// A static import would pull bentCarouselUtil → extend() into the SSR module
// graph, corrupting the React Three Fiber renderer state on the server.
const BentCarouselHero = dynamic(() => import('./BentCarouselHero'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[500px] lg:h-[800px] bg-neutral-50 rounded-xl animate-pulse" />
  ),
});

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content Column */}
        <div className="order-2 lg:order-1">
          <ContentColumn />
        </div>

        {/* 3D Bent Carousel — client-only via ssr:false */}
        <div className="order-1 lg:order-2">
          <BentCarouselHero />
        </div>
      </div>
    </section>
  );
}

