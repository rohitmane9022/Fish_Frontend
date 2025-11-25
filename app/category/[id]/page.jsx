"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import ProductCard2 from "@/components/ProductCard2";
import Image from "next/image";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { categories, products, loading } = useShop();

  const categoryId = params.id;

  // Selected Subcategory
  const initialSub = searchParams.get("sub") || "All";
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSub);

  useEffect(() => {
    setSelectedSubcategory(searchParams.get("sub") || "All");
  }, [searchParams]);


  // Find category
  const category = useMemo(() => {
    return categories?.find((c) => c?._id === categoryId) || null;
  }, [categories, categoryId]);

  // Products in this category
  const categoryProducts = useMemo(() => {
    return (
      products?.filter(
        (p) =>
          p?.category === categoryId ||
          p?.category?._id === categoryId
      ) || []
    );
  }, [products, categoryId]);

  // Subcategories
  const subcategories = useMemo(() => {
    if (!category) return ["All"];

    const categorySubs =
      category?.subcategories?.map((s) => s?.name).filter(Boolean) || [];

    const productSubs = [
      ...new Set(categoryProducts.map((p) => p?.subcategory).filter(Boolean)),
    ];

    return ["All", ...new Set([...categorySubs, ...productSubs])];
  }, [category, categoryProducts]);

  // Filter by selected subcategory
  const filteredProducts = useMemo(() => {
    if (selectedSubcategory === "All") return categoryProducts;

    return categoryProducts.filter(
      (p) =>
        (p?.subcategory || "").trim().toLowerCase() ===
        selectedSubcategory.trim().toLowerCase()
    );
  }, [categoryProducts, selectedSubcategory]);

  // Subcategory image
  const getSubcategoryImage = (sub) => {
    if (sub === "All") return category?.imageUrl;

    const found = category?.subcategories?.find((s) => s?.name === sub);
    if (found?.imageUrl) return found.imageUrl;

    const product = categoryProducts.find((p) => p?.subcategory === sub);
    return product?.imageUrl;
  };

  const handleSubcategoryClick = (subcat) => {
    const query = subcat === "All" ? "" : `?sub=${encodeURIComponent(subcat)}`;
    router.push(`/category/${categoryId}${query}`);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  // 🔥 SAFE RETURNS (AFTER ALL HOOKS)
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
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

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{category?.name}</h1>

      {/* Safety banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-4 mb-6 flex items-center gap-3">
        <span className="text-3xl">📢</span>
        <span className="font-bold text-lg">
          Tested & inspected by safety experts
        </span>
      </div>

      {/* Subcategory tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {subcategories.map((subcat, i) => {
            const imgUrl = getSubcategoryImage(subcat);

            return (
              <div
                key={i}
                onClick={() => handleSubcategoryClick(subcat)}
                className={`flex flex-col items-center min-w-[100px] cursor-pointer ${
                  selectedSubcategory === subcat
                    ? "border-b-4 border-[#e11d48]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="w-22 h-22 rounded-full overflow-hidden mb-2">
                  <Image
                    src={imgUrl}
                    alt={subcat}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{subcat}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product count */}
      <p className="text-gray-700 font-medium mb-6 border-b-[1.5px] pb-3">
        {filteredProducts.length} Items available
      </p>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product?._id}
            onClick={() => handleProductClick(product?._id)}
            className="cursor-pointer"
          >
            <ProductCard2
              product={product}
              image={product.imageUrl}
              title={product?.name}
              weight={product?.weight}
              pieces={product?.pieces}
              serves={product?.serves}
              price={product?.price}
              originalPrice={product?.originalPrice}
              discount={product?.discount}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
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
