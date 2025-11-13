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
        setFeaturedProducts(prodData.filter((p) => p.isHit === true));
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 🛒 CART FUNCTIONS
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartItemQuantity = (id, newQty) => {
    setCartItems((prev) => {
      if (newQty <= 0) return prev.filter((item) => item._id !== id);
      return prev.map((item) =>
        item._id === id ? { ...item, qty: newQty } : item
      );
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item._id !== id));

  const clearCart = () => setCartItems([]);

  // 💖 WISHLIST FUNCTIONS
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((item) => item._id !== id));

  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

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
        removeFromWishlist,
        isInWishlist,
        getProductById: (id) => products.find((p) => p._id === id),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
