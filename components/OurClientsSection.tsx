'use client';

import { Highlighter } from '@/components/ui/highlighter';

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

        {/* Main Content Text — Highlighter uses rough-notation animation only,
            font/size/weight fully controlled by the parent h2 */}
        <div>
          <h2 className="text-4xl lg:text-7xl font-bold leading-tight">
            <Highlighter
              action="underline"
              color="#1E1B2E"
              strokeWidth={2.5}
              animationDuration={700}
              iterations={1}
              padding={2}
              isView
            >
              Trusted
            </Highlighter>{' '}by Operations
            <br />
            <Highlighter
              action="highlight"
              color="#FFD23F"
              strokeWidth={4}
              animationDuration={900}
              iterations={2}
              padding={6}
              multiline={false}
              isView
            >
              Across the Globe
            </Highlighter>.
          </h2>
        </div>
      </div>
    </section>
  );
}



