'use client';

import Image from 'next/image';

const values = [
  {
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge technology to solve tomorrow\'s challenges today.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=800&fit=crop',
  },
  {
    title: 'Excellence',
    description: 'Every project is crafted with meticulous attention to detail and unwavering commitment to quality.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop',
  },
  {
    title: 'Integrity',
    description: 'We build trust through transparency, honesty, and a steadfast commitment to doing what\'s right.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=800&fit=crop',
  },
];

export default function Slide3_Values() {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center gap-8 p-8 lg:p-16 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-5xl lg:text-7xl font-bold uppercase text-black mb-16 text-center">
          Our Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                <Image
                  src={value.imageUrl}
                  alt={value.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-3xl font-bold text-black uppercase">
                {value.title}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


