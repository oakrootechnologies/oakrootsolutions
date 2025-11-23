'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQItem[];
}

export default function FAQSection({ title, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white text-black py-12 lg:py-24 px-4 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-12">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center py-4 hover:text-gray-700 transition-colors min-h-[44px]"
                aria-expanded={openIndex === index}
                aria-label={openIndex === index ? `Close ${faq.question}` : `Open ${faq.question}`}
              >
                <h3 className="text-lg lg:text-xl font-semibold pr-8">
                  {faq.question}
                </h3>
                <span className="text-2xl font-light flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-4">
                  <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

