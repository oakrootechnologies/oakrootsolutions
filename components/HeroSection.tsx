import ContentColumn from './ContentColumn';
import VisualColumn from './VisualColumn';

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content Column */}
        <div className="order-2 lg:order-1">
          <ContentColumn />
        </div>

        {/* Visual Column */}
        <div className="order-1 lg:order-2">
          <VisualColumn />
        </div>
      </div>
    </section>
  );
}

