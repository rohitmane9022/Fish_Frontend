'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';

const stores = [
    {
      name: 'Bombay Sea Food & Cold Storage',
      address:
        'Ground Floor, Plot No. 91/95, Tardeo Mansion, Sitaram Ghadigonkar Marg, Tulsiwadi, Tardeo, Mumbai - 400034',
      rating: 4.9,
      reviews: 60,
      isOpen: true,
      lat: 18.972387,
      lng: 72.81549,
    },
  ];

export default function StoresPage() {
  const [selectedStore, setSelectedStore] = useState(stores[0]); // Default store

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-8 gap-8">
      {/* Store List */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Our Stores in Mumbai</h2>
        <ul className="space-y-4">
          {stores.map((store, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedStore(store)}
              className={`border p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                selectedStore && selectedStore.name === store.name
                  ? 'border-[#e11d48] bg-pink-50'
                  : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="text-[#e11d48]" />
                <span className="font-semibold">{store.name}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{store.address}</p>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span
                  className={`${
                    store.isOpen ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {store.isOpen ? 'Open Now' : 'Closed'}
                </span>
                <span className="text-yellow-500">
                  ★ {store.rating} ({store.reviews}+)
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Google Map Section */}
      <div className="w-full md:w-1/2 h-[450px] rounded-lg overflow-hidden border">
        {selectedStore ? (
          <iframe
            key={selectedStore.name}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&hl=en&z=16&output=embed`}
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Select a store to view on map
          </div>
        )}
      </div>
    </div>
  );
}
