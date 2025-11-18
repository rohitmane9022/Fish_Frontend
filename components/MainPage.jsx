"use client";

import ProductCart from "@/components/ProductCart";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import Categories from "./Categories";
import WhyChooseUs from "./WhyChooseUs";
import { slugify } from "@/lib/utils";

const Home1 = () => {
  const router = useRouter();
  const { products, categories, loading } = useShop();

  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-gray-700">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (!products || !categories) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Please can you Refresh the page again!</p>
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
