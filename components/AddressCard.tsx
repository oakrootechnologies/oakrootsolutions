'use client';

interface AddressCardProps {
  city: string;
  address: string;
  mapLink?: string;
}

export default function AddressCard({ city, address, mapLink }: AddressCardProps) {
  // Convert \n to line breaks for proper rendering
  const formattedAddress = address.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < address.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold mb-2">{city}</h3>
      <p className="text-gray-600 mb-4 whitespace-pre-line">{address}</p>
      {mapLink && (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black font-medium hover:underline underline-offset-4 transition-all"
        >
          View map +
        </a>
      )}
    </div>
  );
}

