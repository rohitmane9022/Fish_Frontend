"use client";
import { useShop } from "@/app/context/ShopContext";
import Image from "next/image";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import emptyCartAnimation from "@/public/emptyCartAnimation.json";
import { useEffect } from "react";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
    userData,
    setUserData,
  } = useShop();

  // Total Amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (
      !userData.name ||
      !userData.phone ||
      !userData.address ||
      !userData.city ||
      !userData.pincode
    ) {
      alert("Please fill in all required details before checkout.");
      return;
    }

    const orderLines = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.weight}) x${item.qty} - ₹${
            item.price * item.qty
          }`
      )
      .join("%0A");

    const message = `Hello! I would like to place an order:%0A%0A${orderLines}%0A%0A*Total:* ₹${totalAmount}%0A%0A*Delivery Details:*%0AName: ${
      userData.name
    }%0APhone: ${userData.phone}%0AEmail: ${
      userData.email || "N/A"
    }%0AAddress: ${userData.address}%0ACity: ${userData.city}%0APincode: ${
      userData.pincode
    }`;

    const whatsappURL = `https://wa.me/919769694115?text=${message}`;
    window.open(whatsappURL, "_blank");
    clearCart();
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-5 ">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Order Summary</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Player
            autoplay
            loop
            src={emptyCartAnimation}
            style={{ height: "250px", width: "250px" }}
          />
          <p className="text-gray-600 text-lg mt-4">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {/* CART ITEMS */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border p-4 w-full transition hover:shadow-md"
              >
                <div className="flex gap-4 items-start flex-wrap">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover border"
                  />

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start w-full">
                      <h2 className="text-base font-semibold text-gray-900 leading-tight">
                        {item.name}
                      </h2>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-rose-600"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">{item.weight}g</p>

                    {/* Desktop Qty */}
                    <div className="hidden sm:flex justify-between items-center mt-3">
                      <p className="font-semibold text-gray-900 text-lg">
                        ₹{item.price * item.qty}
                      </p>

                      <div className="flex items-center bg-gray-50 border rounded-lg overflow-hidden shadow-inner h-9">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item._id, item.qty - 1)
                          }
                          disabled={item.qty === 1}
                          className="px-3 text-lg"
                        >
                          −
                        </button>
                        <span className="px-4">{item.qty}</span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item._id, item.qty + 1)
                          }
                          className="px-3 text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Mobile Qty */}
                    <div className="flex sm:hidden justify-between mt-3">
                      <p className="font-semibold text-gray-900 text-lg">
                        ₹{item.price * item.qty}
                      </p>

                      <div className="flex items-center bg-gray-50 border rounded-lg overflow-hidden shadow-inner h-9">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item._id, item.qty - 1)
                          }
                          disabled={item.qty === 1}
                          className="px-3 text-lg"
                        >
                          −
                        </button>
                        <span className="px-4">{item.qty}</span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item._id, item.qty + 1)
                          }
                          className="px-3 text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DELIVERY FORM */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-5 h-fit">
            <h2 className="text-xl font-semibold">Delivery Details</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-2"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />

              <textarea
                placeholder="Full Address"
                className="w-full border rounded-lg px-4 py-2"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
              />

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/2 border rounded-lg px-4 py-2"
                  value={userData.city}
                  onChange={(e) =>
                    setUserData({ ...userData, city: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-1/2 border rounded-lg px-4 py-2"
                  value={userData.pincode}
                  onChange={(e) =>
                    setUserData({ ...userData, pincode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xl font-semibold flex justify-between">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-rose-600 text-white font-semibold py-3 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
