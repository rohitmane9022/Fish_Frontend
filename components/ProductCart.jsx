"use client";

import { useShop } from "@/app/context/ShopContext";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductCart({
  id,
  imageUrl,
  name,
  price,
  originalPrice,
  discount,
  weight,
  pieces,
  serves,
  onClick,
}) {
  const { addToCart, cartItems, updateCartItemQuantity } = useShop();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = cartItems.find((item) => item._id === id);
    setQuantity(item ? item.qty : 0);
  }, [cartItems, id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      _id: id,
      name,
      imageUrl,
      price,
      originalPrice,
      discount,
      weight,
      pieces,
      serves,
    });
  };

  return (
    <div className="w-55 relative rounded-2xl">
      <div className="relative h-40 bg-gray-100 rounded-2xl">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={137}
          className="w-full h-full object-cover rounded-2xl"
          onClick={onClick}
        />

        {quantity === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
            }}
            className="absolute -bottom-2 -right-4 z-20 bg-white border-2 rounded-lg py-1.5 px-2.5 shadow-lg"
          >
            <Plus size={20} className="text-red-500 font-bold" />
          </button>
        ) : (
          <div
            className="absolute -bottom-2 -right-4 z-20 flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border-2 shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => updateCartItemQuantity(id, quantity - 1)}
              className="text-red-500 hover:text-red-600"
            >
              <Minus size={18} />
            </button>

            <span className="font-semibold text-base">{quantity}</span>

            <button
              onClick={() => updateCartItemQuantity(id, quantity + 1)}
              className="text-red-500 hover:text-red-600"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2 p-2" onClick={onClick}>
        <h3 className="font-semibold text-base leading-6">{name}</h3>

        {/* ⭐ CONDITIONAL SPECS */}
        <div className="flex items-center gap-1.5">

{/* Weight */}
{weight && weight.trim() !== "" && (
  <p className="font-semibold text-sm">{weight}</p>
)}

{/* Pieces */}
{pieces &&
  pieces.trim() !== "" &&
  !pieces.trim().toLowerCase().startsWith("0") && (
    <span className="text-xs text-gray-600">| Pieces {pieces}</span>
  )}

{/* Serves */}
{Number(serves) > 0 && (
  <span className="text-xs text-gray-600">| Serves {serves}</span>
)}

</div>


        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>

          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{originalPrice}
            </span>
          )}

          {discount && (
            <span className="text-green-600 text-xs font-semibold">
              {discount}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
