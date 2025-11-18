"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import ProductCard2 from "@/components/ProductCard2";
import { slugify } from "@/lib/utils";

export default function ViewMorePage() {
  const { slug } = useParams();
  const { products, categories, featuredProducts, loading } = useShop();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (loading || !slug) return;

    const cleanedSlug = slugify(slug);
    let data = [];

    // ⭐ 1) OUR CURRENT HITS — FIXED
    if (
      cleanedSlug === "our-current-hits" ||
      cleanedSlug === "current-hits"
    ) {
      data = featuredProducts;
      setFilteredProducts(data);
      return; // stop here
    }

    // ⭐ 2) READY TO COOK
    if (cleanedSlug === "ready-to-cook") {
      data = products.filter((p) =>
        p.tags?.map((t) => t.toLowerCase()).includes("ready-to-cook")
      );
      setFilteredProducts(data);
      return;
    }

    // ⭐ 3) CATEGORY MATCH (for chicken, fish, etc.)
    const matchedCategory = categories.find(
      (cat) => slugify(cat.name) === cleanedSlug
    );

    if (matchedCategory) {
      data = products.filter((p) => p.category?._id === matchedCategory._id);
      setFilteredProducts(data);
      return;
    }

    // ❌ No match
    setFilteredProducts([]);
  }, [slug, products, categories, featuredProducts, loading]);

  // ===============================

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
