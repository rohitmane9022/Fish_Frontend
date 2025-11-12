'use client';
import { useShop } from '@/app/context/ShopContext';
import { useState } from 'react';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';
import emptyCartAnimation from '@/public/emptyCartAnimation.json';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useShop();
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleCheckout = () => {
    if (!userData.name || !userData.phone || !userData.address || !userData.city || !userData.pincode) {
      alert('Please fill in all required details before checkout.');
      return;
    }

    const orderLines = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.weight}) x${item.qty} - ₹${item.price * item.qty}.00`
      )
      .join('%0A');

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const message = `Hello! I would like to place an order:%0A%0A${orderLines}%0A%0A*Total:* ₹${totalAmount}.00%0A%0A*Delivery Details:*%0AName: ${userData.name}%0APhone: ${userData.phone}%0AEmail: ${
      userData.email || 'N/A'
    }%0AAddress: ${userData.address}%0ACity: ${userData.city}%0APincode: ${userData.pincode}%0A%0APlease confirm availability and delivery time.`;

    const whatsappURL = `https://wa.me/918356869325?text=${message}`;
    window.open(whatsappURL, '_blank');
    clearCart();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Player autoplay loop src={emptyCartAnimation} style={{ height: '250px', width: '250px' }} />
          <p className="text-gray-600 text-lg mt-4">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left - Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  {item.imageUrl && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.weight}</p>
                    <p className="text-sm text-gray-700 font-medium mt-1">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => updateCartItemQuantity(item._id, item.qty - 1)}
                      disabled={item.qty === 1}
                      className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="px-4 text-gray-800 font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item._id, item.qty + 1)}
                      className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-right text-gray-900 font-semibold">
                    ₹{item.price * item.qty}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Checkout */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-5 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Details</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email (optional)"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <textarea
                placeholder="Full Address"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500"
                  value={userData.city}
                  onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-1/2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500"
                  value={userData.pincode}
                  onChange={(e) => setUserData({ ...userData, pincode: e.target.value })}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-lg font-semibold text-gray-900 flex justify-between">
                <span>Total:</span>
                <span>
                  ₹
                  {cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}
                </span>
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg mt-4 transition"
            >
              Checkout via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
