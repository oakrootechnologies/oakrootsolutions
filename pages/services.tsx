import Head from 'next/head';
import ProcessScrollSection from '@/components/ProcessScrollSection';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Our Process | Oakroot Solutions</title>
        <meta
          name="description"
          content="Discover how Oakroot Solutions transforms your vision into reality through our proven process of creative strategy, development, and conversion-focused marketing."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black">
        <ProcessScrollSection />
      </main>
    </>
  );
}

