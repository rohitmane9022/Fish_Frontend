"use client";

import { useState } from "react";
import { Heart, Plus, Minus, Bell, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useShop } from "@/app/context/ShopContext";
import toast from "react-hot-toast";

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
    loading,
  } = useShop();

  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifyForm, setNotifyForm] = useState({ name: "", phone: "" });

  const product = getProductById(params.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-gray-700">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500">
        Product not found. Please refresh.
      </div>
    );
  }

  const isAvailable = product.inStock;
  const isFavorite = isInWishlist(product._id);

  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.qty : 0;

  const handleToggleWishlist = () => toggleWishlist(product);

  const handleAddToCart = () => addToCart(product);
  const handleIncrement = () => updateCartItemQuantity(product._id, quantity + 1);
  const handleDecrement = () =>
    quantity > 1
      ? updateCartItemQuantity(product._id, quantity - 1)
      : updateCartItemQuantity(product._id, 0);

  const handleNotifySubmit = async () => {
    if (!notifyForm.name || !notifyForm.phone) {
      return toast.error("Enter name & phone number");
    }

    try {
      setNotifyLoading(true);

      const res = await fetch("/api/notify", {
        method: "POST",
        body: JSON.stringify({
          name: notifyForm.name,
          phone: notifyForm.phone,
          productId: product._id,
          productName: product.name,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setNotifyDone(true);
        toast.success("We will notify you soon!");
      } else {
        toast.error("Failed. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setNotifyLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT IMAGE */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow">

            <button
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 z-40 bg-white p-3 rounded-full shadow"
            >
              <Heart
                size={22}
                className={
                  isFavorite
                    ? "fill-[#e11d48] text-[#e11d48]"
                    : "text-gray-400"
                }
              />
            </button>

            <Image
              src={product.imageUrl}
              width={600}
              height={600}
              alt={product.name}
              className="w-full h-full object-contain bg-white"
            />

            {!isAvailable && (
              <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center z-20 pointer-events-none">
                <span className="bg-black/70 text-white px-5 py-1 rounded-full text-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="flex flex-col">

          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* ⭐ CONDITIONAL SPECS */}
          <div className="flex gap-6 mb-6 border-b pb-6">
            {product.weight && (
              <span className="font-medium">⚖️ {product.weight}</span>
            )}

            {product.pieces > 0 && (
              <span className="font-medium">🍖 {product.pieces}</span>
            )}

            {product.serves > 0 && (
              <span className="font-medium">👥 Serves {product.serves}</span>
            )}
          </div>

          {/* Highlights */}
          {product.highlights?.length > 0 && (
            <div className="mb-6 flex gap-2 flex-wrap">
              {product.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 text-sm"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Nutrition */}
          <div className="mb-6 text-gray-700 space-y-1">
            <h3 className="font-semibold text-gray-500">Nutrition (per 100g)</h3>
            <p>Energy: {product.nutrition.energy}</p>
            <p>Carbs: {product.nutrition.carbohydrate}</p>
            <p>Fat: {product.nutrition.fat}</p>
            <p>Protein: {product.nutrition.protein}</p>
          </div>

          {/* PRICE + BUTTON */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-start mb-4">

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold">₹{product.price}</span>
                  <span className="text-lg text-green-600 font-semibold">
                    {product.discount} off
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  MRP:  
                  <span className="line-through">₹{product.originalPrice}</span>
                </p>
              </div>

              {!isAvailable ? (
                <button
                  onClick={() => setNotifyOpen(true)}
                  className={`px-9 py-3.5 rounded-lg font-bold flex items-center gap-2 shadow
                  ${
                    notifyDone
                      ? "bg-green-600 text-white"
                      : "bg-white border border-[#e11d48] text-[#e11d48]"
                  }`}
                >
                  {notifyDone ? (
                    <>
                      Done <Check size={18} />
                    </>
                  ) : (
                    <>
                      Notify Me <Bell size={18} />
                    </>
                  )}
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-[#e11d48] text-white px-9 py-3.5 rounded-lg font-bold flex items-center gap-2 shadow"
                >
                  Add to Cart +
                </button>
              ) : (
                <div className="flex items-center gap-4 border rounded-lg px-4 py-2 shadow">
                  <button onClick={handleDecrement} className="text-[#e11d48]">
                    <Minus size={20} />
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button onClick={handleIncrement} className="text-[#e11d48]">
                    <Plus size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* NOTIFY POPUP */}
      {notifyOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-6">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">

            <h2 className="text-xl font-bold mb-4">Notify Me</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={notifyForm.name}
              onChange={(e) => setNotifyForm({ ...notifyForm, name: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={notifyForm.phone}
              onChange={(e) =>
                setNotifyForm({ ...notifyForm, phone: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={handleNotifySubmit}
              disabled={notifyLoading || notifyDone}
              className="w-full bg-[#e11d48] text-white py-2.5 rounded-lg mb-3 font-semibold disabled:opacity-50"
            >
              {notifyLoading ? "Sending..." : "Notify Me"}
            </button>

            <button
              onClick={() => setNotifyOpen(false)}
              className="w-full bg-gray-200 py-2.5 rounded-lg"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
