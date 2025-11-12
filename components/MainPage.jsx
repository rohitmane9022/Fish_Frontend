"use client";

import ProductCart from "@/components/ProductCart";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import Categories from "./Categories";
import WhyChooseUs from "./WhyChooseUs";

const Home1 = () => {
  const router = useRouter();
  const { products, categories, featuredProducts, loading } = useShop();
  console.log(categories)

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
          <div className="w-16 h-16 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  // Filter sections
  const fishProducts = products.filter(
    (p) => p.category?.name?.toLowerCase().includes("fish")
  );
  const chickenProducts = products.filter(
    (p) => p.category?.name?.toLowerCase().includes("chicken")
  );
  const readyToCookProducts = products.filter((p) =>
    p.tags?.includes("ready-to-cook")
  );

  const currentHits = products.filter((p) => p.isHit === true);

  return (
    <div className="space-y-10">
      <div className="container max-w-6xl mx-auto px-6 py-10">
        {/* ✅ Current Hits Section */}
        <section>
          <h2 className="text-[22px] font-bold">Our Current Hits</h2>
          <p className="text-base text-gray-600 mb-4 -mt-0.5">
            Here's what everyone's eating!
          </p>

          <div className="relative group">
            <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
              {currentHits.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  
                  className="cursor-pointer"
                >
                  <ProductCart
                    image={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                    title={product.name}
                    weight={product.weight}
                    pieces={product.pieces}
                    serves={product.serves}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    deliveryTime={product.deliveryTime}
                    onClick={() => handleProductClick(product._id)}
                  />
                </div>
              ))}

              <div
                onClick={() => router.push("/view-more/our-current-hits")}
                className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors"
              >
                View More
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Fish Section */}
        <section>
          <h2 className="text-[21px] font-bold">Fish, Exclusive Fish and Seafood</h2>
          <p className="text-base text-gray-600 mb-4 -mt-0.5">
            Caught on the same day
          </p>

          <div className="relative group">
            <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
              {fishProducts.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                
                  className="cursor-pointer"
                >
                  <ProductCart
                    image={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                    title={product.name}
                    weight={product.weight}
                    pieces={product.pieces}
                    serves={product.serves}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    deliveryTime={product.deliveryTime}
                    onClick={() => handleProductClick(product._id)}
                  />
                </div>
              ))}

              <div
                onClick={() => router.push("/view-more/Fresh-exclusive-Fish-and-Seafood")}
                className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors"
              >
                View More
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Categories Section */}
        <section>
          <h2 className="text-[22px] font-bold">Shop by Categories</h2>
          <p className="text-base text-gray-600 mb-4 -mt-0.5">
            Freshest meats and much more!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.map((category) => (
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

        {/* ✅ Chicken Section */}
        <section>
          <h2 className="text-[21px] font-bold">Best of Chicken</h2>
          <p className="text-base text-gray-600 mb-4 -mt-0.5">
            Our most tender chicken cuts!
          </p>

          <div className="relative group">
            <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
              {chickenProducts.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                 
                  className="cursor-pointer"
                >
                  <ProductCart
                    image={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                    title={product.name}
                    weight={product.weight}
                    pieces={product.pieces}
                    serves={product.serves}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    deliveryTime={product.deliveryTime}
                    onClick={() => handleProductClick(product._id)}
                  />
                </div>
              ))}

              <div
                onClick={() => router.push("/view-more/chicken")}
                className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors"
              >
                View More
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Ready to Cook Section */}
        <section>
          <h2 className="text-[21px] font-bold">Ready to Cook</h2>
          <p className="text-base text-gray-600 mb-4 -mt-0.5">
            Quick and easy meals!
          </p>

          <div className="relative group">
            <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
              {readyToCookProducts.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                 
                  className="cursor-pointer"
                >
                  <ProductCart
                    image={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                    title={product.name}
                    weight={product.weight}
                    pieces={product.pieces}
                    serves={product.serves}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    deliveryTime={product.deliveryTime}
                    onClick={() => handleProductClick(product._id)}
                  />
                </div>
              ))}

              <div
                onClick={() => router.push("/view-more/ready-to-cook")}
                className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors"
              >
                View More
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
};

export default Home1;
