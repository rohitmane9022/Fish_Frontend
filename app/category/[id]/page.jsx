"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { products, categories, getCategoryById } from "@/lib/data";
import ProductCard2 from "@/components/ProductCard2";
import { Filter, Clock } from "lucide-react";
import Image from "next/image";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;

  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Get category data
  const category = getCategoryById(categoryId);
  
  // Get all products in this category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category._id === categoryId);
  }, [categoryId]);

  // Get unique subcategories
  const subcategories = useMemo(() => {
    const subs = ["All", ...new Set(categoryProducts.map((p) => p.subcategory))];
    return subs;
  }, [categoryProducts]);

  // Filter products by subcategory
  const filteredProducts = useMemo(() => {
    if (selectedSubcategory === "All") {
      return categoryProducts;
    }
    return categoryProducts.filter((p) => p.subcategory === selectedSubcategory);
  }, [categoryProducts, selectedSubcategory]);

  // Get subcategory images
  const getSubcategoryImage = (subName) => {
    const product = categoryProducts.find((p) => p.subcategory === subName);
    return product?.imageUrl || "/uploads/default.jpg";
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span className="cursor-pointer hover:text-[#e11d48]" onClick={() => router.push("/")}>
          Home
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{category.name}</h1>

      {/* Safety Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📢</span>
          <span className="font-bold text-lg">Tested & inspected by safety experts</span>
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {subcategories.map((subcat, index) => {
            const imgUrl = subcat === "All" 
              ? category.imageUrl 
              : getSubcategoryImage(subcat);
            
            return (
              <div
                key={index}
                onClick={() => setSelectedSubcategory(subcat)}
                className={`flex flex-col items-center min-w-[100px] cursor-pointer transition-all ${
                  selectedSubcategory === subcat
                    ? "border-b-4 border-[#e11d48]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-gray-200">
                  <Image
                    src={`http://localhost:4000${imgUrl}`}
                    alt={subcat}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-center">{subcat}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Count */}
      <div className="flex items-center justify-between mb-6 py-3 border-y">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter size={18} />
          <span className="font-medium">Filters</span>
        </button>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-200">
            <Clock size={18} />
            <span className="font-medium">30min delivery</span>
          </button>
        </div>
      </div>

      {/* Item Count */}
      <p className="text-gray-700 font-medium mb-6">
        {filteredProducts.length} Items available
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="cursor-pointer"
          >
            <ProductCard2
              image={`http://localhost:4000${product.imageUrl}`}
              title={product.name}
              weight={product.weight}
              pieces={product.pieces}
              serves={product.serves}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              deliveryTime={product.deliveryTime}
              onAddToCart={(e) => {
                e.stopPropagation();
                console.log(`${product.name} added to cart`);
              }}
              onToggleFavorite={(e) => {
                e.stopPropagation();
                console.log(`${product.name} toggled favorite`);
              }}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found in this category</p>
        </div>
      )}
    </div>
  );
}