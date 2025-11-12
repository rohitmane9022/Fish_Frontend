"use client";

import { Heart, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";

const ProductCard2 = ({ product }) => {
  const router = useRouter();
  const { addToCart, cartItems, updateCartItemQuantity, toggleWishlist, isInWishlist } = useShop();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (product?._id) {
      setFavorite(isInWishlist(product._id));
    }
  }, [isInWishlist, product?._id]);
  

  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.qty : 0;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    setFavorite(!favorite);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateCartItemQuantity(product._id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1) updateCartItemQuantity(product._id, quantity - 1);
    else updateCartItemQuantity(product._id, 0);
  };

  const handleProductClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-white">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart
            size={18}
            className={favorite ? "fill-[#e11d48] text-[#e11d48]" : "text-gray-400"}
          />
        </button>

        <div className="w-full h-full flex items-center justify-center p-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
            alt={product.name}
            width={300}
            height={225}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 text-sm text-gray-700 mb-4">
          <span>{product.weight}</span>
          <span className="text-gray-300">|</span>
          <span>{product.pieces} Pieces</span>
          <span className="text-gray-300">|</span>
          <span>Serves {product.serves}</span>
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-sm line-through text-gray-400">₹{product.originalPrice}</span>
              <span className="text-sm text-green-600 font-semibold">{product.discount} off</span>
            </div>
          </div>
        </div>

        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white py-2.5 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            Add <span className="text-xl font-normal">+</span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-4 bg-white border rounded-lg px-4 py-2 shadow-sm">
            <button onClick={handleDecrement} className="text-[#e11d48] hover:text-[#be123c]">
              <Minus size={20} />
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button onClick={handleIncrement} className="text-[#e11d48] hover:text-[#be123c]">
              <Plus size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard2;
