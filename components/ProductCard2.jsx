"use client";

import { Heart, Plus, Minus, Bell, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import toast from "react-hot-toast";

const ProductCard2 = ({ product }) => {
  const router = useRouter();
  const { addToCart, cartItems, updateCartItemQuantity, toggleWishlist, isInWishlist } = useShop();

  const [favorite, setFavorite] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifyForm, setNotifyForm] = useState({ name: "", phone: "" });

  const inStock = product.inStock;

  useEffect(() => {
    if (product?._id) setFavorite(isInWishlist(product._id));
  }, [isInWishlist, product?._id]);

  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.qty : 0;

  const handleNotifySubmit = async () => {
    if (!notifyForm.name || !notifyForm.phone) {
      return toast.error("Please fill all fields");
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
        toast.error("Failed, try again");
      }
    } catch {
      toast.error("Error sending request");
    } finally {
      setNotifyLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => router.push(`/product/${product._id}`)}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer border border-gray-100"
      >
        <div className="relative aspect-[4/3] bg-gray-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
              setFavorite(!favorite);
            }}
            className="absolute top-3 right-3 z-30 bg-white rounded-full p-2 shadow"
          >
            <Heart
              size={18}
              className={favorite ? "fill-[#e11d48] text-[#e11d48]" : "text-gray-400"}
            />
          </button>

          <div className="w-full h-full flex items-center justify-center p-6">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={225}
              className="w-full h-full object-contain"
            />
          </div>

          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 pointer-events-none">
              <span className="bg-black/70 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold mb-1">{product.name}</h3>

          {/* ⭐ SPECS */}
          <div className="flex items-center gap-1.5 text-sm text-gray-700 mb-3">

{/* Weight */}
{product.weight && product.weight.trim() !== "" && (
  <span>{product.weight}</span>
)}

{/* Pieces */}
{product.pieces &&
  product.pieces.trim() !== "" &&
  !product.pieces.trim().toLowerCase().startsWith("0") && (
    <>
      <span className="text-gray-300">|</span>
      <span>Pieces {product.pieces}</span>
    </>
  )}

{/* Serves */}
{Number(product.serves) > 0 && (
  <>
    <span className="text-gray-300">|</span>
    <span>Serves {product.serves}</span>
  </>
)}

</div>


          {/* ⭐ PRICE */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>

            {product.originalPrice && Number(product.originalPrice) > 0 && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.originalPrice}
              </span>
            )}

            {product.discount && Number(product.discount) > 0 && (
              <span className="text-green-600 text-xs font-semibold">
                {product.discount}% off
              </span>
            )}
          </div>

          {!inStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setNotifyOpen(true);
              }}
              className={`w-full ${
                notifyDone ? "bg-green-600 text-white" : "bg-white border border-[#e11d48] text-[#e11d48]"
              } py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2`}
            >
              {notifyDone ? "Done" : "Notify"}
            </button>
          ) : quantity === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full bg-[#e11d48] text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              Add +
            </button>
          ) : (
            <div
              className="flex items-center justify-center gap-4 border rounded-lg px-4 py-2 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-[#e11d48]"
                onClick={() => updateCartItemQuantity(product._id, quantity - 1)}
              >
                <Minus size={20} />
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="text-[#e11d48]"
                onClick={() => updateCartItemQuantity(product._id, quantity + 1)}
              >
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NOTIFY POPUP */}
      {notifyOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
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
              onChange={(e) => setNotifyForm({ ...notifyForm, phone: e.target.value })}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={handleNotifySubmit}
              disabled={notifyLoading || notifyDone}
              className="w-full bg-[#e11d48] text-white py-2 rounded-lg mb-3 disabled:opacity-50"
            >
              {notifyLoading ? "Submitting..." : "Notify Me"}
            </button>

            <button
              onClick={() => setNotifyOpen(false)}
              className="w-full bg-gray-200 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard2;
