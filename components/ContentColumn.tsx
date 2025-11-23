import Link from 'next/link';

export default function ContentColumn() {
  return (
    <div className="flex flex-col justify-center">
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
        Oakroot Solutions – The Best for Your Business
      </h1>

      {/* Paragraph */}
      <p className="text-gray-600 text-base sm:text-lg max-w-lg mb-6 sm:mb-8">
        As your creative partner, we&apos;re your all-in-one destination for creative services—here to grow your business, solve challenges, and elevate your brand with lasting impact. We offer comprehensive <Link href="/services/branding" className="underline hover:text-gray-800">Branding</Link>, <Link href="/services/web-design" className="underline hover:text-gray-800">Website Development</Link>, <Link href="/services/digital-marketing" className="underline hover:text-gray-800">Digital Marketing</Link>, and <Link href="/services/app-development" className="underline hover:text-gray-800">AI Automations</Link> solutions.
      </p>

      {/* Button Container */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4 sm:mt-8">
        <Link
          href="#contact"
          className="bg-black text-white rounded-full py-3 px-6 sm:px-8 font-medium hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base min-h-[44px] flex items-center justify-center"
        >
          Book a Demo
        </Link>
        <Link
          href="#quote"
          className="bg-blue-600 text-white rounded-full py-3 px-6 sm:px-8 font-medium hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base min-h-[44px] flex items-center justify-center"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

