'use client';
import { useShop } from '@/app/context/ShopContext';
import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

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

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (!userData.name || !userData.phone || !userData.address || !userData.city || !userData.pincode) {
      alert('Please fill in all required details before checkout.');
      return;
    }

    const orderLines = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.weight}) x${item.qty} - ₹${item.price * item.qty}`
      )
      .join('%0A');

    const message = `Hello! I would like to place an order:%0A%0A${orderLines}%0A%0A*Total:* ₹${totalAmount}%0A%0A*Delivery Details:*%0AName: ${userData.name}%0APhone: ${userData.phone}%0AEmail: ${userData.email || 'N/A'}%0AAddress: ${userData.address}%0ACity: ${userData.city}%0APincode: ${userData.pincode}%0A`;

    const whatsappURL = `https://wa.me/918356869325?text=${message}`;
    window.open(whatsappURL, '_blank');
    clearCart();
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-5 ">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Order Summary</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Player autoplay loop src={emptyCartAnimation} style={{ height: '250px', width: '250px' }} />
          <p className="text-gray-600 text-lg mt-4">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {/* Left Section: Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-4 w-full "
              >
                <div className="flex gap-5">

  <div className="flex-shrink-0">
    <Image
      src={item.imageUrl}
      alt={item.name}
      width={80}
      height={80}
      className="rounded-lg object-cover"
    />
  </div>

  
  <div className="flex justify-between w-full flex-1">
   
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
      <p className="text-sm text-gray-600 font-semibold">{item.weight}g</p>
      <p className="text-base font-semibold mt-1 text-gray-900">₹{item.price}</p>
    </div>

    {/* RIGHT CONTENT */}
    <div className="flex flex-col items-end gap-3">
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

      <p className="font-semibold text-gray-900">
        ₹{item.price * item.qty}
      </p>

      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-500 text-sm font-medium hover:underline"
      >
        Remove Item
      </button>
    </div>
  </div>
</div>

              </div>
            ))}
          </div>

          {/* Right Section: Delivery Info + Total */}
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

            {/* Total Only */}
            <div className="border-t pt-4">
              <p className="text-xl font-semibold text-gray-900 flex justify-between">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg mt-4 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
