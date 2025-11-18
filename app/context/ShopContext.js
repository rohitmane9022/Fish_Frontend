"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [catRes, prodRes] = await Promise.all([
          fetch(`/api/categories`),
          fetch(`/api/products`),
        ]);

        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);

        setCategories(catData);
        setProducts(prodData);
        setFeaturedProducts(prodData.filter((p) => p.isHit));
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedWishlist = localStorage.getItem("wishlist");
    const storedUser = localStorage.getItem("userCheckoutData");

    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    if (storedUser) setUserData(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("userCheckoutData", JSON.stringify(userData));
  }, [userData]);

  // CART FUNCTIONS
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i._id === product._id);

      if (exists) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartItemQuantity = (id, qty) => {
    setCartItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i._id !== id);

      return prev.map((i) =>
        i._id === id ? { ...i, qty } : i
      );
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i._id !== id));

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i._id === product._id);
      if (exists) return prev.filter((i) => i._id !== product._id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((i) => i._id === id);

  return (
    <ShopContext.Provider
      value={{
        loading,
        categories,
        products,
        featuredProducts,
        cartItems,
        wishlist,

        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,

        toggleWishlist,
        isInWishlist,

        getProductById: (id) => products.find((p) => p._id === id),

        userData,
        setUserData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
