"use client";

import { useState } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useShop } from "@/app/context/ShopContext";

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();

  const {
    addToCart,
    cartItems,
    updateCartItemQuantity,
    toggleWishlist,
    isInWishlist,
    getProductById,
  } = useShop();

  const [showFullDescription, setShowFullDescription] = useState(false);

  // ✅ get product directly from context
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Product not found</p>
      </div>
    );
  }

  // 🛒 Cart handling
  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.qty : 0;

  // 💖 Wishlist handling
  const isFavorite = isInWishlist(product._id);
  const handleToggleWishlist = () => toggleWishlist(product);

  // 🛒 Cart button handlers
  const handleAddToCart = () => addToCart(product);
  const handleIncrement = () =>
    updateCartItemQuantity(product._id, quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      updateCartItemQuantity(product._id, quantity - 1);
    } else {
      updateCartItemQuantity(product._id, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span
          className="cursor-pointer hover:text-[#e11d48]"
          onClick={() => router.push("/")}
        >
          Home
        </span>
        <span className="mx-2">/</span>
        <span
          className="cursor-pointer hover:text-[#e11d48]"
          onClick={() => router.push(`/category/${product.category._id}`)}
        >
          {product.category.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-sm">
            <button
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg transition-shadow"
            >
              <Heart
                size={20}
                className={
                  isFavorite
                    ? "fill-[#e11d48] text-[#e11d48]"
                    : "text-gray-400"
                }
              />
            </button>

            <div className="flex items-center justify-center">
              <Image
                width={100}
                height={100}
                src={`${product.imageUrl}`}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>

          <p className="text-gray-600 text-base mb-5">{product.description}</p>

          {/* Product specs */}
          <div className="flex gap-6 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <span className="text-gray-800 font-medium">{product.weight}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍖</span>
              <span className="text-gray-800 font-medium">{product.pieces}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <span className="text-gray-800 font-medium">
                Serves {product.serves}
              </span>
            </div>
          </div>

          {/* Highlights */}
          {product.highlights?.length > 0 && (
            <div className="mb-6 flex gap-2 flex-wrap">
              {product.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Nutrition */}
          {product.nutrition && (
            <div className="mb-6 space-y-2 text-gray-700">
              <h3 className="font-bold text-gray-500 ">
              Nutritional Information: (Approx Values per 100g)
              </h3>
              <p>Total Energy: {product.nutrition.energy}</p>
              <p>Carbohydrate: {product.nutrition.carbohydrate}</p>
              <p>Fat: {product.nutrition.fat}</p>
              <p>Protein: {product.nutrition.protein}</p>
            </div>
          )}

          {/* Price + Cart */}
          <div className="border-t pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.discount && (
                    <span className="text-lg text-green-600 font-semibold">
                      {product.discount} off
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  MRP:{" "}
                  <span className="line-through">₹{product.originalPrice}</span>{" "}
                  (incl. of all taxes)
                </p>
              </div>

              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-3.5 rounded-lg font-bold text-base flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
                >
                  Add to Cart <span className="text-2xl font-normal">+</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2 shadow-sm">
                  <button
                    onClick={handleDecrement}
                    className="text-[#e11d48] hover:text-[#be123c]"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="text-[#e11d48] hover:text-[#be123c]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-[#e11d48] font-bold flex items-center gap-1 text-base hover:underline"
              >
                <span className="text-lg">©</span> Only the Safest{" "}
                {product.category.name}!
              </a>
              {product.deliveryTime && (
                <span className="text-gray-700 text-base font-medium">
                  {product.deliveryTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
