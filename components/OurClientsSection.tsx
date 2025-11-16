'use client';

export default function OurClientsSection() {
  return (
    <section className="w-full bg-white text-black px-4 lg:px-16 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Header - Our clients */}
        <div className="mb-6 lg:mb-12">
          <h3 className="text-base lg:text-xl font-medium">
            <span className="font-bold text-black underline">Our clients</span>
          </h3>
        </div>

        {/* Main Content Text */}
        <div>
          <h2 className="text-4xl lg:text-8xl font-bold leading-tight">
            We work with<br />
            ambitious clients.
          </h2>
        </div>
      </div>
    </section>
  );
}


