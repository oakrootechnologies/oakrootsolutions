import Head from 'next/head';
import ProcessScrollSection from '@/components/ProcessScrollSection';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Our Process - Oakroot</title>
        <meta name="description" content="Discover how Oakroot transforms your vision into reality through our proven process." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black">
        <ProcessScrollSection />
      </main>
    </>
  );
}

