"use client";

import ProductCart from "@/components/ProductCart";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import Categories from "./Categories";
import WhyChooseUs from "./WhyChooseUs";
import { slugify } from "@/lib/utils";

const Home1 = () => {
  const router = useRouter();
  const { products, categories, loading, error, retryCount, manualRetry } = useShop();

  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  // Enhanced loading state with retry info
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="flex flex-col items-center gap-6">
          {/* Animated loader */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full" />
            <div className="w-20 h-20 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          
          {/* Loading text with pulse animation */}
          <div className="text-center space-y-2">
            <p className="text-xl font-semibold text-gray-800 animate-pulse">
              {retryCount > 0 ? `Retrying... (${retryCount}/3)` : "Loading products..."}
            </p>
            <p className="text-sm text-gray-500">
              {retryCount > 0 
                ? "Connection issue detected, retrying automatically" 
                : "Please wait while we fetch fresh deals"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state after max retries
  if (error && retryCount >= 3) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            {/* Error icon */}
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-[#e11d48]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>

            {/* Error message */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Unable to Load Products
            </h3>
            <p className="text-gray-600 mb-2">
              We tried loading the products 3 times but couldn't connect to the server.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Error: {error}
            </p>

            {/* Retry buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={manualRetry}
                className="bg-[#e11d48] hover:bg-[#be123c] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced error state when data is missing but no explicit error
  if (!categories || !products) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            {/* Warning icon */}
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-yellow-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>

            {/* Error message */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">
              {!products && !categories 
                ? "We couldn't load categories and products."
                : !products 
                ? "We couldn't load products." 
                : "We couldn't load categories."}
            </p>

            {/* Retry button */}
            <button
              onClick={manualRetry}
              className="bg-[#e11d48] hover:bg-[#be123c] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Return category name directly
  const getCategoryName = (product) => {
    return product?.category?.name?.toLowerCase() || "";
  };

  // Filter Products
  const currentHits = products.filter((p) => p.isHit);

  const fishProducts = products.filter((p) =>
    getCategoryName(p).includes("fish")
  );

  const chickenProducts = products.filter((p) =>
    getCategoryName(p).includes("chicken")
  );

  const readyToCookProducts = products.filter((p) =>
    p.tags?.includes("ready-to-cook")
  );

  // Get categories for View More slug
  const fishCategory = categories.find((c) =>
    c.name.toLowerCase().includes("fish")
  );

  const chickenCategory = categories.find((c) =>
    c.name.toLowerCase().includes("chicken")
  );

  return (
    <div>
      <div className="container max-w-6xl mx-auto px-6 py-10">

       
        <section className="mb-5">
          <h2 className="text-[22px] font-bold">Shop by Categories</h2>
          <p className="text-base text-gray-600 mb-4">
            Freshest meats and much more!
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className="cursor-pointer"
              >
                <Categories name={category.name} imageUrl={category.imageUrl} />
              </div>
            ))}
          </div>
        </section>

        {/* ================= CURRENT HITS ================= */}
        <section className="mb-5">
          <h2 className="text-[22px] font-bold">Our Current Hits</h2>
          <p className="text-base text-gray-600 mb-4">
            Here's what everyone's eating!
          </p>

          <div className="flex overflow-x-auto scrollbar-hide gap-8">
            {currentHits.slice(0, 5).map((product) => (
              <div key={product._id} className="cursor-pointer">
                <ProductCart
                  id={product._id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  weight={product.weight}
                  pieces={product.pieces}
                  serves={product.serves}
                  onClick={() => handleProductClick(product._id)}
                />
              </div>
            ))}

            <div
              onClick={() =>
                router.push(`/view-more/${slugify("Our Current Hits")}`)
              }
              className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer"
            >
              View More
            </div>
          </div>
        </section>

        {/* ================= FISH SECTION ================= */}
        <section className="mb-5">
          <h2 className="text-[21px] font-bold">
            Fish, Exclusive Fish and Seafood
          </h2>
          <p className="text-base text-gray-600 mb-4">
            Caught on the same day
          </p>

          <div className="flex overflow-x-auto scrollbar-hide gap-8">
            {fishProducts.slice(0, 5).map((product) => (
              <div key={product._id} className="cursor-pointer">
                <ProductCart
                  id={product._id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  weight={product.weight}
                  pieces={product.pieces}
                  serves={product.serves}
                  onClick={() => handleProductClick(product._id)}
                />
              </div>
            ))}

            <div
              onClick={() =>
                router.push(`/view-more/${slugify(fishCategory?.name)}`)
              }
              className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer"
            >
              View More
            </div>
          </div>
        </section>

        {/* ================= CHICKEN SECTION ================= */}
        <section className="mb-5">
          <h2 className="text-[21px] font-bold">Best of Chicken</h2>
          <p className="text-base text-gray-600 mb-4">
            Our most tender chicken cuts!
          </p>

          <div className="flex overflow-x-auto scrollbar-hide gap-8">
            {chickenProducts.slice(0, 5).map((product) => (
              <div key={product._id} className="cursor-pointer">
                <ProductCart
                  id={product._id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  weight={product.weight}
                  pieces={product.pieces}
                  serves={product.serves}
                  onClick={() => handleProductClick(product._id)}
                />
              </div>
            ))}

            <div
              onClick={() =>
                router.push(`/view-more/${slugify(chickenCategory?.name)}`)
              }
              className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer"
            >
              View More
            </div>
          </div>
        </section>

        {/* ================= READY TO COOK ================= */}
        <section>
          <h2 className="text-[21px] font-bold">Ready to Cook</h2>
          <p className="text-base text-gray-600 mb-4">
            Quick and easy meals!
          </p>

          <div className="flex overflow-x-auto scrollbar-hide gap-8">
            {readyToCookProducts.slice(0, 5).map((product) => (
              <div key={product._id} className="cursor-pointer">
                <ProductCart
                  id={product._id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  weight={product.weight}
                  pieces={product.pieces}
                  serves={product.serves}
                  onClick={() => handleProductClick(product._id)}
                />
              </div>
            ))}

            <div
              onClick={() =>
                router.push(`/view-more/${slugify("ready to cook")}`)
              }
              className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer"
            >
              View More
            </div>
          </div>
        </section>
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default Home1;