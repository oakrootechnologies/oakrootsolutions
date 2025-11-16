import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  title: string;
  imageUrl: string;
  horizontal?: boolean;
  href?: string;
  index?: number; // Index to determine if this is the first instance (for SEO - only first instance uses h3)
}

export default function ServiceCard({ title, imageUrl, horizontal = false, href, index = 0 }: ServiceCardProps) {
  // For horizontal marquee, use fixed width; for vertical grid, use aspect ratio
  // Vertical: height is 1.3 times the width (10:13 ratio means height = 1.3 * width)
  const containerClasses = horizontal
    ? 'relative overflow-hidden rounded-3xl w-64 sm:w-72 md:w-80 aspect-[4/5] group'
    : 'relative overflow-hidden rounded-3xl w-full aspect-[10/13] group';

  // For SEO: Only the first instance (index === 0) should be an h3, others should be p tags
  // But we use the same className to preserve visual design
  const titleClassName = "absolute top-4 left-4 text-white font-semibold text-sm sm:text-base md:text-lg drop-shadow-lg z-10";
  const TitleTag = index === 0 ? 'h3' : 'p';

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
      {TitleTag === 'h3' ? (
        <h3 className={titleClassName}>
          {title}
        </h3>
      ) : (
        <p className={titleClassName}>
          {title}
        </p>
      )}
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

