import Head from 'next/head';
import CinematicScrollStory from '@/components/CinematicScrollStory';

export default function InfoPage() {
  return (
    <>
      <Head>
        <title>Our Story - Oakroot</title>
        <meta name="description" content="Discover the story behind Oakroot - Building the future." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black">
        <CinematicScrollStory />
      </main>
    </>
  );
}


