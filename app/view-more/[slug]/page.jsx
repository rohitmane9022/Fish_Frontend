"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import ProductCard2 from "@/components/ProductCard2";

export default function ViewMorePage() {
  const { slug } = useParams();
  const { products, featuredProducts, categories, loading } = useShop();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 🧠 Create a map of category name to _id for convenience
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.name?.toLowerCase()] = cat._id;
    });
    return map;
  }, [categories]);

  useEffect(() => {
    if (!slug || loading) return;

    let data = [];

    switch (slug) {
      case "current-hits":
        // ✅ Products marked as "Our Current Hits"
        data = featuredProducts;
        break;

      case "ready-to-cook":
        // ✅ Products tagged as ready-to-cook
        data = products.filter((p) =>
          p.tags?.map((t) => t.toLowerCase()).includes("ready-to-cook")
        );
        break;

      default:
        // ✅ Check if slug matches a category name (like "fish", "chicken", etc.)
        const categoryId = categoryMap[slug?.toLowerCase()];
        if (categoryId) {
          data = products.filter((p) => p.category?._id === categoryId);
        } else {
          // fallback: show all products
          data = products;
        }
        break;
    }

    setFilteredProducts(data);
  }, [slug, products, featuredProducts, categories, categoryMap, loading]);

  // 🧭 If loading, show placeholder
  if (loading) {
    return (
      <section className="container max-w-6xl mx-auto py-12 text-center">
        <p className="text-gray-500">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="container max-w-6xl mx-auto py-8 px-5">
      <h2 className="text-3xl font-bold mb-4 capitalize">
        {slug.replaceAll("-", " ")}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard2 key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
