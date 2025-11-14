"use client";
import Link from "next/link";
import { Store, Heart, ShoppingCart, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { cartItems, wishlist } = useShop();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex justify-around py-3">

        {/* HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center ${
            pathname === "/" ? "text-rose-600" : "text-gray-700"
          }`}
        >
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* STORE */}
        <Link
          href="/store"
          className={`flex flex-col items-center ${
            pathname === "/store" ? "text-rose-600" : "text-gray-700"
          }`}
        >
          <Store size={22} />
          <span className="text-xs mt-1">Store</span>
        </Link>

        {/* WISHLIST */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center relative ${
            pathname === "/wishlist" ? "text-rose-600" : "text-gray-700"
          }`}
        >
          <Heart size={22} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-2 bg-rose-600 text-white text-[10px] px-1 rounded-full">
              {wishlist.length}
            </span>
          )}
          <span className="text-xs mt-1">Wishlist</span>
        </Link>

        {/* CART */}
        <Link
          href="/cart"
          className={`flex flex-col items-center relative ${
            pathname === "/cart" ? "text-rose-600" : "text-gray-700"
          }`}
        >
          <ShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 right-2 bg-rose-600 text-white text-[10px] px-1 rounded-full">
              {cartItems.length}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </Link>
      </div>
    </div>
  );
}
