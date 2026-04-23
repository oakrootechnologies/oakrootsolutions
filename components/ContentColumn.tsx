import Link from 'next/link';

export default function ContentColumn() {
  return (
    <div className="flex flex-col justify-center">
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
        Oakroot Solutions – SECURE. SCALABLE. SOVEREIGN.
      </h1>

      {/* Subline */}
      <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium max-w-xl mb-6 sm:mb-8">
        Custom software, SEO, and operations tooling for businesses that can&apos;t afford things to break.
      </p>

      {/* Button Container */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4 sm:mt-8">
        <Link
          href="/work"
          className="bg-black text-white rounded-full py-3 px-6 sm:px-8 font-medium hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base min-h-[44px] flex items-center justify-center"
        >
          See Our Work
        </Link>
        <Link
          href="/contact"
          className="bg-aurora text-white rounded-full py-3 px-6 sm:px-8 font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base min-h-[44px] flex items-center justify-center transform hover:scale-105"
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
}

