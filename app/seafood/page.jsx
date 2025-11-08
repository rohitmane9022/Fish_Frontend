'use client'
import { useState } from 'react'

// Replace this with the real data you get from MongoDB/server.
const productsData = [
  {
    _id: '1',
    name: "Rohu (Freshwater Fish)",
    subcategory: "Freshwater",
    imageUrl: "/uploads/freshwater-rohu.jpeg",
    price: 399,
    inStock: true
  },
  {
    _id: '2',
    name: "Pomfret (Seawater Fish)",
    subcategory: "Seawater",
    imageUrl: "/uploads/seawater-pomfret.jpeg",
    price: 499,
    inStock: false
  },
  {
    _id: '3',
    name: "Catla (Freshwater Fish)",
    subcategory: "Freshwater",
    imageUrl: "/uploads/freshwater-catla.jpeg",
    price: 359,
    inStock: true
  },
  {
    _id: '4',
    name: "King Fish (Seawater)",
    subcategory: "Seawater",
    imageUrl: "/uploads/seawater-kingfish.jpeg",
    price: 699,
    inStock: true
  }
 
]

const TABS = [
  { name: 'All', value: 'All' },
  { name: 'Freshwater', value: 'Freshwater' },
  { name: 'Seawater', value: 'Seawater' }
];

export default function SeafoodPage() {
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All'
    ? productsData
    : productsData.filter(p => p.subcategory === selected);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Tabs */}
      <div className="flex gap-8 px-4 pt-8 pb-4 bg-blue-100 rounded-b-3xl">
        {TABS.map(tab => (
          <button
            key={tab.value}
            className={`flex flex-col items-center px-4 py-2 rounded-lg
              ${selected === tab.value ? 'border-b-4 border-pink-600 text-pink-600 font-bold' : 'text-gray-700'}
            `}
            onClick={() => setSelected(tab.value)}
          >
            {/* Place your icons here, if any */}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Product listing */}
      <div className="px-4 mt-6 mb-16">
        <div className="text-gray-700 font-semibold mb-4">
          {filtered.length} Items available
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map(product => (
            <div key={product._id} className="relative bg-white shadow rounded-2xl overflow-hidden">
              <img
                src={`http://localhost:4000${product.imageUrl}`}
                alt={product.name}
                className={`w-full h-48 object-cover
                  ${product.inStock ? '' : 'grayscale'}`}
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
              )}
              <div className="p-4">
                <div className="font-bold text-lg">{product.name}</div>
                <div className="text-pink-600 font-semibold mt-2">{product.price} INR</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
