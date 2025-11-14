"use client";
import Link from "next/link";
import { useShop } from "@/app/context/ShopContext";

export default function CartPopup() {
  const { cartItems } = useShop();

  if (cartItems.length === 0) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 bg-black text-white px-4 py-3 flex justify-between items-center z-50">
      <span className="text-sm">
        {cartItems.length} Item | ₹{total}
      </span>
      <Link href="/cart" className="font-medium text-sm">
        View Cart →
      </Link>
    </div>
  );
}
