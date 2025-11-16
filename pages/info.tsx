import Head from 'next/head';
import dynamic from 'next/dynamic';

// Lazy load heavy component for better performance
const CinematicScrollStory = dynamic(() => import('@/components/CinematicScrollStory'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="text-gray-400">Loading story...</div>
    </div>
  ),
});

export default function InfoPage() {
  return (
    <>
      <Head>
        <title>Our Story | Oakroot Solutions</title>
        <meta
          name="description"
          content="Discover the story behind Oakroot Solutions - Building the future through creative strategy, innovation, and conversion-focused marketing."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black">
        <CinematicScrollStory />
      </main>
    </>
  );
}


