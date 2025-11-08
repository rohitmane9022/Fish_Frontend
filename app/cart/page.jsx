'use client';
import { useShop } from '@/app/context/ShopContext';
import { useState } from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateCartQty } = useShop();
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

    const message = `Hello! I would like to place an order:%0A%0A${orderLines}%0A%0A*Total:* ₹${totalAmount}.00%0A%0A*Delivery Details:*%0AName: ${userData.name}%0APhone: ${userData.phone}%0AEmail: ${userData.email || 'N/A'}%0AAddress: ${userData.address}%0ACity: ${userData.city}%0APincode: ${userData.pincode}%0A%0APlease confirm availability and delivery time.`;

    const whatsappURL = `https://wa.me/918356869325?text=${message}`;
    window.open(whatsappURL, '_blank');
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {item.weight} | ₹{item.price} each
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateCartQty(item._id, item.qty - 1)}
                      disabled={item.qty === 1}
                      className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-gray-800 font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateCartQty(item._id, item.qty + 1)}
                      className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-medium text-gray-700 w-20 text-right">
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

          {/* Cart Total */}
          <div className="text-right text-lg font-semibold mb-8">
            Total: ₹
            {cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}
          </div>

          {/* Customer Details */}
          <div className="space-y-4 mb-8">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-2"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-lg px-4 py-2"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              className="w-full border rounded-lg px-4 py-2"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <textarea
              placeholder="Full Address"
              className="w-full border rounded-lg px-4 py-2"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border rounded-lg px-4 py-2"
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Pincode"
              className="w-full border rounded-lg px-4 py-2"
              value={userData.pincode}
              onChange={(e) => setUserData({ ...userData, pincode: e.target.value })}
            />
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="bg-[#e11d48] hover:bg-[#be123c] text-white font-bold px-8 py-3 rounded-lg"
          >
            Checkout via WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
