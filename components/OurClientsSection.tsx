'use client';

export default function OurClientsSection() {
  return (
    <section className="w-full bg-white text-black px-8 lg:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Header - Our clients */}
        <div className="mb-12">
          <h3 className="text-xl font-medium">
            <span className="font-bold text-black underline">Our clients</span>
          </h3>
        </div>

        {/* Main Content Text */}
        <div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            We work with<br />
            ambitious clients.
          </h2>
        </div>
      </div>
    </section>
  );
}


