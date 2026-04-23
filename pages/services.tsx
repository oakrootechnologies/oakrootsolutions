import Head from 'next/head';
import ServicesDeepDive from '@/components/ServicesDeepDive';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Our Services | Oakroot Solutions</title>
        <meta
          name="description"
          content="Discover Oakroot Solutions' premium services: Branding, UI/UX Design, Web Development, App Development, AI Automation, Digital Marketing, and Analytics & Growth."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black">
        <ServicesDeepDive />
      </main>
    </>
  );
}

