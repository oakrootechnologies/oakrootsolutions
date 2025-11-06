import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  title: string;
  imageUrl: string;
  horizontal?: boolean;
  href?: string;
}

export default function ServiceCard({ title, imageUrl, horizontal = false, href }: ServiceCardProps) {
  // For horizontal marquee, use fixed width; for vertical grid, use aspect ratio
  // Vertical: height is 1.3 times the width (10:13 ratio means height = 1.3 * width)
  const containerClasses = horizontal
    ? 'relative overflow-hidden rounded-3xl w-64 sm:w-72 md:w-80 aspect-[4/5] group'
    : 'relative overflow-hidden rounded-3xl w-full aspect-[10/13] group';

  const cardContent = (
    <>
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes={horizontal ? '(max-width: 768px) 256px, 320px' : '(max-width: 768px) 50vw, 25vw'}
        unoptimized={imageUrl.includes('unsplash.com')}
      />
      <span className="absolute top-4 left-4 text-white font-semibold text-sm sm:text-base md:text-lg drop-shadow-lg z-10">
        {title}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${containerClasses} cursor-pointer`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {cardContent}
    </div>
  );
}

