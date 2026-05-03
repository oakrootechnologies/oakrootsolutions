import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

const IMAGES_ROW_A = [
  "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1887&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop",
];

const IMAGES_ROW_B = [
  "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1874&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop",
];

export function ScrollBasedVelocityImagesDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12 bg-white">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-6">
          {IMAGES_ROW_A.map((src, idx) => (
            <img
              key={idx}
              src={`${src}&ixlib=rb-4.0.3`}
              alt="Unsplash sample"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-6 inline-block h-48 w-72 rounded-xl object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-6">
          {IMAGES_ROW_B.map((src, idx) => (
            <img
              key={idx}
              src={`${src}&ixlib=rb-4.0.3`}
              alt="Unsplash sample"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-6 inline-block h-48 w-72 rounded-xl object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      
      {/* Side gradients for soft edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
}
