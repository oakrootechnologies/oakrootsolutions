import Head from 'next/head';
import Image from 'next/image';
import AddressCard from '@/components/AddressCard';
import ContactForm from '@/components/ContactForm';

// Office data
const offices = [
  {
    id: '1',
    city: 'Indore',
    address: 'DAVV Incubation Centre\nIT Park Indore\nMP 452020\nIndia',
    mapLink: 'https://maps.google.com/?q=IT+Park+Indore+MP+452020',
  },
  {
    id: '2',
    city: 'Bhopal',
    address: 'Shivmodi Enclave\nArera colony Bhopal\nMP 462003\nIndia',
    mapLink: 'https://maps.google.com/?q=Shivmodi+Enclave+Arera+colony+Bhopal+MP+462003',
  },
];

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - Oakroot</title>
        <meta name="description" content="Get in touch with Oakroot Solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-black px-8 lg:px-16 py-24">
        {/* Page Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-12">Get in touch.</h1>

        {/* Main Image */}
        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-16">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop"
            alt="Oakroot Office"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
          {/* Inquiries Column */}
          <aside className="md:col-span-1">
            {/* Mobile Number Section */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-600 mb-2">
                <a
                  href="tel:+919202212290"
                  className="text-black hover:underline underline-offset-4 transition-all"
                >
                  +91 9202212290
                </a>
              </p>
            </div>

            {/* General Inquiries Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">General Inquiries</h3>
              <p className="text-gray-600 mb-2">
                <a
                  href="mailto:info@oakrootsolutions.com"
                  className="text-black hover:underline underline-offset-4 transition-all"
                >
                  info@oakrootsolutions.com
                </a>
              </p>
            </div>
          </aside>

          {/* Addresses Column */}
          <section className="md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((office) => (
                <AddressCard
                  key={office.id}
                  city={office.city}
                  address={office.address}
                  mapLink={office.mapLink}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

