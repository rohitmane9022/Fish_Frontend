"use client";

import ProductCart from "@/components/ProductCart";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import Categories from "./Categories";
import WhyChooseUs from "./WhyChooseUs";
import { slugify } from "@/lib/utils";
import AboutUs from "./AboutUs";

const Home1 = () => {
  const router = useRouter();
  const { products, categories, loading, error, retryCount, manualRetry } =
    useShop();

  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  // ---------------------------
  // LOADING UI
  // ---------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full" />
            <div className="w-20 h-20 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="text-xl font-semibold text-gray-800 animate-pulse">
            {retryCount > 0
              ? `Retrying... (${retryCount}/3)`
              : "Loading products..."}
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------
  // ERROR UI
  // ---------------------------
  if (error && retryCount >= 3) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Unable to Load Products
            </h3>
            <p className="text-sm text-gray-500 mb-6">Error: {error}</p>
            <button
              onClick={manualRetry}
              className="bg-[#e11d48] hover:bg-[#be123c] text-white px-6 py-3 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!categories || !products) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <p className="text-gray-600">Something went wrong...</p>
      </div>
    );
  }

  // ----------------------------------------
  // 🔥 IMPORTANT: FILTER OUT OUT-OF-STOCK
  // ----------------------------------------
  const availableProducts = products.filter((p) => p.inStock !== false);

  // Helper to compare
  const getCategoryName = (product) =>
    product?.category?.name?.toLowerCase() || "";

  // ----------------------------------------
  // FILTERED SECTIONS (ONLY IN STOCK)
  // ----------------------------------------
  const currentHits = availableProducts.filter((p) => p.isHit);

  const fishProducts = availableProducts.filter((p) =>
    getCategoryName(p).includes("fish")
  );

  const chickenProducts = availableProducts.filter((p) =>
    getCategoryName(p).includes("chicken")
  );

  const readyToCookProducts = availableProducts.filter((p) =>
    p.tags?.includes("ready-to-cook")
  );

  // Category slugs
  const fishCategory = categories.find((c) =>
    c.name.toLowerCase().includes("fish")
  );

  const chickenCategory = categories.find((c) =>
    c.name.toLowerCase().includes("chicken")
  );

  return (
    <div>
      <div className="container max-w-6xl mx-auto px-6 py-10">

        {/* -------------------- CATEGORIES -------------------- */}
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

        {/* -------------------- CURRENT HITS -------------------- */}
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

        {/* -------------------- FISH SECTION -------------------- */}
        <section className="mb-5">
          <h2 className="text-[21px] font-bold">
           Exclusive Seafood
          </h2>
          <p className="text-base text-gray-600 mb-4">Caught on the same day</p>

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

        {/* -------------------- CHICKEN SECTION -------------------- */}
        <section className="mb-5">
          <h2 className="text-[21px] font-bold mb-3">Best of Chicken</h2>

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

        {/* -------------------- READY TO COOK -------------------- */}
        <section>
          <h2 className="text-[21px] font-bold mb-4">Ready to Cook</h2>

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
      <AboutUs />
    </div>
  );
};

export default Home1;
