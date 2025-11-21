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
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // 2 seconds

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [catRes, prodRes] = await Promise.all([
          fetch(`/api/categories`),
          fetch(`/api/products`),
        ]);

        // Check for errors
        if (!catRes.ok || !prodRes.ok) {
          const errorMsg = [];
          
          if (!catRes.ok) {
            errorMsg.push(`Categories: ${catRes.status}`);
          }
          if (!prodRes.ok) {
            errorMsg.push(`Products: ${prodRes.status}`);
          }

          // If products API returns 500, trigger retry
          if (prodRes.status === 500 || catRes.status === 500) {
            throw new Error(`Server error - ${errorMsg.join(", ")}`);
          }
        }

        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);

        setCategories(catData);
        setProducts(prodData);
        setFeaturedProducts(prodData.filter((p) => p.isHit));
        setRetryCount(0); // Reset retry count on success
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);

        // Auto-retry logic for errors
        if (retryCount < MAX_RETRIES) {
          console.log(`Auto-retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, RETRY_DELAY);
        }
      }
    };

    fetchData();
  }, [retryCount]);

  // Manual retry function
  const manualRetry = () => {
    setRetryCount(0);
    setProducts([]);
    setCategories([]);
    setFeaturedProducts([]);
    setError(null);
    setLoading(true);
  };

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
        error,
        retryCount,
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

        manualRetry,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);