"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import ProductCard2 from "@/components/ProductCard2";
import { Filter, Clock } from "lucide-react";
import Image from "next/image";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = params.id;
  const { categories, products, loading } = useShop();

  // ✅ Get subcategory from URL (?sub=Raw)
  const initialSub = searchParams.get("sub") || "All";
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSub);
  const [showFilters, setShowFilters] = useState(false);

  // Update state if URL changes
  useEffect(() => {
    const sub = searchParams.get("sub") || "All";
    setSelectedSubcategory(sub);
  }, [searchParams]);

  // 🕒 Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  // 🧩 Find current category
  const category = categories?.find((c) => c?._id === categoryId);

  // ✅ Safely filter products that belong to this category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p?.category?._id === categoryId);
  }, [categoryId, products]);

  // ✅ Build subcategory list safely
  const subcategories = useMemo(() => {
    const categorySubs =
      category?.subcategories?.map((s) => s?.name).filter(Boolean) || [];
    const productSubs = [
      ...new Set(categoryProducts.map((p) => p?.subcategory).filter(Boolean)),
    ];
    return ["All", ...new Set([...categorySubs, ...productSubs])];
  }, [category, categoryProducts]);

  // ✅ Filter products by selected subcategory
  const filteredProducts = useMemo(() => {
    if (selectedSubcategory === "All") return categoryProducts;
    return categoryProducts.filter(
      (p) => p?.subcategory === selectedSubcategory
    );
  }, [categoryProducts, selectedSubcategory]);

  // ✅ Get subcategory image
  const getSubcategoryImage = (subName) => {
    if (subName === "All") return category?.imageUrl || "/uploads/default.jpg";
    const foundSub = category?.subcategories?.find((s) => s?.name === subName);
    if (foundSub?.imageUrl) return foundSub.imageUrl;

    const product = categoryProducts.find((p) => p?.subcategory === subName);
    return product?.imageUrl || "/uploads/default.jpg";
  };

  // ✅ Handle subcategory click and update URL
  const handleSubcategoryClick = (subcat) => {
    setSelectedSubcategory(subcat);
    const query = subcat === "All" ? "" : `?sub=${encodeURIComponent(subcat)}`;
    router.push(`/category/${categoryId}${query}`);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  // ❌ Invalid category fallback
  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 🧭 Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span
          className="cursor-pointer hover:text-[#e11d48]"
          onClick={() => router.push("/")}
        >
          Home
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category?.name}</span>
      </div>

      {/* 🏷️ Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{category?.name}</h1>

      {/* 🧠 Safety Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📢</span>
          <span className="font-bold text-lg">
            Tested & inspected by safety experts
          </span>
        </div>
      </div>

      {/* 🧩 Subcategory Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {subcategories.map((subcat, index) => {
            const imgUrl =
              subcat === "All" ? category?.imageUrl : getSubcategoryImage(subcat);

            return (
              <div
                key={index}
                onClick={() => handleSubcategoryClick(subcat)}
                className={`flex flex-col items-center min-w-[100px] cursor-pointer transition-all ${
                  selectedSubcategory === subcat
                    ? "border-b-4 border-[#e11d48]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${imgUrl}`}
                    alt={subcat}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/uploads/default.jpg")}
                  />
                </div>
                <span className="text-sm font-medium text-center">{subcat}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🧰 Filters */}
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

      {/* 📦 Product Count */}
      <p className="text-gray-700 font-medium mb-6">
        {filteredProducts?.length || 0} Items available
      </p>

      {/* 🛒 Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product?._id}
            onClick={() => handleProductClick(product?._id)}
            className="cursor-pointer"
          >
            <ProductCard2
              product={product}
              image={`http://localhost:4000${product.imageUrl}`}
              title={product?.name || "Unnamed Product"}
              weight={product?.weight}
              pieces={product?.pieces}
              serves={product?.serves}
              price={product?.price}
              originalPrice={product?.originalPrice}
              discount={product?.discount}
              onAddToCart={(e) => {
                e.stopPropagation();
                console.log(`${product?.name} added to cart`);
              }}
              onToggleFavorite={(e) => {
                e.stopPropagation();
                console.log(`${product?.name} toggled favorite`);
              }}
            />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No products found in this category
          </p>
        </div>
      )}
    </div>
  );
}
