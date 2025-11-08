'use client';
import React, { useState } from 'react';
import { ShoppingCart, User, Search, Layers, Store } from 'lucide-react';
import Link from 'next/link';
import { useShop } from '@/app/context/ShopContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useShop();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-4xl font-bold italic text-gray-800">Licious</span>
        </Link>

        {/* Search */}
        <div className="flex flex-1 max-w-xl">
          <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any delicious product"
              className="flex-1 py-2.5 px-4 focus:outline-none text-sm text-gray-600"
            />
            <button onClick={handleSearch} className="p-2.5 hover:bg-gray-50 transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
            <Layers className="w-5 h-5" />
            <span className="text-base font-normal">Categories</span>
          </button>

          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
            <Store className="w-5 h-5" />
            <span className="text-base font-normal">Stores</span>
          </button>

          <Link href="/cart" className="relative flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-base font-normal">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#e11d48] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
