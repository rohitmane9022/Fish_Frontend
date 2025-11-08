
"use client";
import { Heart, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductCart({
  image,
  title,
  price,
  originalPrice,
  discount,
  weight,
  pieces,
  serves,
  onAddToCart = () => {},
  onToggleFavorite = () => {},
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite();
  };

  const handleAdd = () => {
    setQuantity(1);
    onAddToCart(1);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart(newQuantity);
    } else if (quantity === 1) {
      setQuantity(0);
      onAddToCart(0);
    }
  };

  return (
    <div className="w-55 relative rounded-2xl">
   
      <div className="relative h-40 bg-gray-100 rounded-2xl">
      <Image
  src={image}
  alt={title}
  width={200}
  height={137}
  className="w-full h-full object-cover rounded-2xl"
/>


        {quantity === 0 ? (
          <button
            onClick={handleAdd}
            className="absolute -bottom-2 -right-4 z-20 bg-white border-2 rounded-lg py-1.5 px-2.5 shadow-lg transition-all duration-200"
          >
            <Plus size={20} className="text-red-500 font-bold" />
          </button>
        ) : (
          <div className="absolute -bottom-2 -right-4 z-20 flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 shadow-xs border-2">
            <button
              onClick={handleDecrement}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="font-semibold text-base">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>

     
      <div className="space-y-2 p-2">
        <h3 className="font-semibold text-base leading-6">{title}</h3>
    
        <div className="flex items-cente gap-1.5  ">
          {weight && <p className="font-semibold text-sm">{weight}</p>}
          {pieces && <span className="text-xs text-gray-600 flex items-center">| {pieces} Pieces</span>}
          {serves && <span className="text-xs text-gray-600 flex items-center">| Serves {serves}</span>}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          <span className="text-gray-400 line-through text-sm">
            ₹{originalPrice}
          </span>
          <span className="text-green-600 text-xs font-semibold">
            {discount}
          </span>
        </div>
      </div>
    </div>
  );
}
