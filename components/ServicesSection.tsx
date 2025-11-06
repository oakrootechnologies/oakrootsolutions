import ScrollingMarquee from './ScrollingMarquee';

export default function ServicesSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-white text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
          Beyond Websites—A Full 360° Approach to Brand Elevation
        </h2>

        {/* Paragraph */}
        <p className="text-neutral-300 text-center text-base sm:text-lg max-w-3xl mx-auto mt-4 mb-12 sm:mb-16 leading-relaxed">
          Your website is just one piece of the puzzle. We take a holistic approach to brand elevation & conversion-focused growth. Our suite of creative services from Design to branding and marketing. Video & more, ensure your brand connects with your audience across every touchpoint.
        </p>

        {/* Scrolling Marquee */}
        <ScrollingMarquee />
      </div>
    </section>
  );
}

