"use client";

'use client';
import { useShop } from '@/app/context/ShopContext';
import dynamic from 'next/dynamic';

// 🧩 Dynamically import Player — disable SSR for this component
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);


import WishlistAni from "@/public/WishlishAni.json";
import ProductCard2 from '@/components/ProductCard2';

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <section className="container max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Player
            autoplay
            loop
            src={WishlistAni}
            style={{ height: "250px", width: "250px" }}
          />
          <p className="text-gray-600 text-lg mt-4">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <ProductCard2 key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
