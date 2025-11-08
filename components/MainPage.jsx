"use client";

import ProductCart from "@/components/ProductCart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Categories from "./Categories";
import { products, categories, getFeaturedProducts } from "@/lib/data";
import { useRouter } from "next/navigation";

const Home1 = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const featuredProducts = getFeaturedProducts();
  const visibleProducts = featuredProducts.slice(0, 5);
  
  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Current Hits Section */}
      <section>
        <h2 className="text-[22px] font-bold">Our current hits</h2>
        <p className="text-base text-gray-600 mb-4 -mt-0.5">
          Here's what everyone's eating!
        </p>

        <div className="relative group">
          <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
            {visibleProducts?.map((product) => (
              <div 
                key={product._id} 
                onClick={() => handleProductClick(product._id)}
                className="cursor-pointer"
              >
                <ProductCart
                  image={product.imageUrl}
                  title={product.name}
                  weight={product.weight}
                  pieces={product.pieces}
                  serves={product.serves}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  deliveryTime={product.deliveryTime}
                  
                />
              </div>
            ))}

            <div className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors">
              View More
            </div>
          </div>
        </div>
      </section>

      {/* Fish & Seafood Section */}
      <section>
        <h2 className="text-[21px] font-bold">Fish, exclusive Fish and Seafood</h2>
        <p className="text-base text-gray-600 mb-4 -mt-0.5">
          Caught on the same day
        </p>

        <div className="relative group">
          <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
            {products
              .filter((p) => p.category._id === "1")
              .slice(0, 5)
              .map((product) => (
                <div 
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="cursor-pointer"
                >
                  <ProductCart
                    image={product.imageUrl}
                    title={product.name}
                    weight={product.weight}
                    pieces={product.pieces}
                    serves={product.serves}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    deliveryTime={product.deliveryTime}
                    onAddToCart={() => console.log(`${product.name} added to cart`)}
                    onToggleFavorite={() => console.log(`${product.name} toggled favorite`)}
                  />
                </div>
              ))}

            <div className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors">
              View More
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section>
        <h2 className="text-[22px] font-bold">Shop by categories</h2>
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
              <Categories
                name={category.name}
                imageUrl={category.imageUrl}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Best of Chicken Section */}
      <section>
        <h2 className="text-[21px] font-bold">Best of Chicken</h2>
        <p className="text-base text-gray-600 mb-4 -mt-0.5">
          Our most tender chicken cuts!
        </p>

        <div className="relative group">
          <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
            {products
              .filter((p) => p.category._id === "2")
              .slice(0, 5)
              .map((product) => (
                <div 
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="cursor-pointer"
                >
                  <ProductCart
                    image={product.imageUrl}
                    title={product.name}
                    weight={product.weight}
                    pieces={product.pieces}
                    serves={product.serves}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    deliveryTime={product.deliveryTime}
                    onAddToCart={() => console.log(`${product.name} added to cart`)}
                    onToggleFavorite={() => console.log(`${product.name} toggled favorite`)}
                  />
                </div>
              ))}

            <div className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors">
              View More
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Cook Section */}
      <section>
        <h2 className="text-[21px] font-bold">Ready to Cook</h2>
        <p className="text-base text-gray-600 mb-4 -mt-0.5">
          Quick and easy meals!
        </p>

        <div className="relative group">
          <div className="flex overflow-x-auto scrollbar-hide gap-8 scroll-smooth">
            {products
              .filter((p) => p.tags.includes("ready-to-cook"))
              .slice(0, 5)
              .map((product) => (
                <div 
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="cursor-pointer"
                >
                  <ProductCart
                    image={product.imageUrl}
                    title={product.name}
                    weight={product.weight}
                    pieces={product.pieces}
                    serves={product.serves}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    deliveryTime={product.deliveryTime}
                    onAddToCart={() => console.log(`${product.name} added to cart`)}
                    onToggleFavorite={() => console.log(`${product.name} toggled favorite`)}
                  />
                </div>
              ))}

            <div className="min-w-[220px] flex items-center justify-center rounded-2xl bg-[#fdf9f7] border text-[#e11d48] font-semibold cursor-pointer hover:bg-[#fef5f2] transition-colors">
              View More
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home1;