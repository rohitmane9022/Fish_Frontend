"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const ProductCard2 = ({
  image,
  title,
  description,
  weight,
  pieces,
  serves,
  price,
  originalPrice,
  discount,
  deliveryTime,
  onAddToCart,
  onToggleFavorite,
  onClick
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite?.();
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-white">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-[#e11d48] text-[#e11d48]" : "text-gray-400"}
          />
        </button>

        {/* Product Image */}
        <div className="w-full h-full flex items-center justify-center p-6">
          <Image
            src={image}
            alt={title}
            width={300}
            height={225}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Image Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        {/* India's Juiciest Chicken Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 100 100" className="w-full h-full p-1">
              <defs>
                <path
                  id="circlePath2"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[6px] font-bold fill-gray-700">
                <textPath href="#circlePath2" startOffset="50%" textAnchor="middle">
                  INDIA'S JUICIEST CHICKEN
                </textPath>
              </text>
              <text x="50" y="52" textAnchor="middle" className="text-lg">
                🍗
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Product Details */}
        <div className="flex items-center gap-3 text-sm text-gray-700 mb-4">
          <span>{weight}</span>
          <span className="text-gray-300">|</span>
          <span>{pieces}</span>
          <span className="text-gray-300">|</span>
          <span>Serves {serves}</span>
        </div>

        {/* Price Section */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{price}</span>
              <span className="text-sm line-through text-gray-400">₹{originalPrice}</span>
              <span className="text-sm text-green-600 font-semibold">{discount} off</span>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        {deliveryTime && (
          <p className="text-sm text-gray-600 mb-3">
            {deliveryTime}
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white py-2.5 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors"
        >
          Add
          <span className="text-xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard2;