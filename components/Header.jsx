"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Layers,
  Heart,
  Menu,
  X,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const { cartItems, wishlist, products, categories } = useShop();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Category and Subcategory navigation
  const handleCategoryClick = (categoryId) => {
    setCatMenuOpen(false);
    router.push(`/category/${categoryId}`);
  };

  const handleSubcategoryClick = (categoryId, subcategoryName) => {
    setCatMenuOpen(false);
    router.push(`/category/${categoryId}?sub=${encodeURIComponent(subcategoryName)}`);
  };

  // Search filter
  const filteredProducts =
    searchQuery.trim() === ""
      ? []
      : products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleSearchClick = (productId) => {
    setSearchQuery("");
    router.push(`/product/${productId}`);
  };

  const getLinkClass = (path) =>
    pathname === path
      ? "flex items-center gap-2 text-[#e11d48] font-medium transition"
      : "flex items-center gap-2 text-gray-700 hover:text-gray-900 transition";

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="flex items-center min-w-[145px]">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={50}
            className="object-contain w-[110px] sm:w-[130px] h-auto"
            priority
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6 relative">
          <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any delicious product"
              className="flex-1 py-2.5 px-4 focus:outline-none text-sm text-gray-600"
            />
            <button className="p-2.5 hover:bg-gray-50 transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          {filteredProducts.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSearchClick(product._id)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.images?.[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center gap-8 relative">
          <Link href="/store" className={getLinkClass("/store")}>
            <Store className="w-5 h-5" />
            <span className="text-base font-normal">Stores</span>
          </Link>

          {/* Desktop Categories MegaMenu */}
          <div
            className="relative"
            onClick={() => setCatMenuOpen(!catMenuOpen)}
          >
            <button
              className={
                "flex items-center gap-2 text-gray-700 hover:text-[#e11d48] transition text-base font-normal" +
                (catMenuOpen ? " text-[#e11d48] font-semibold" : "")
              }
              tabIndex={0}
            >
              <Layers className="w-5 h-5" />
              Categories
            </button>

            {/* Category MegaMenu */}
            {catMenuOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-12 w-[640px] bg-white border rounded-lg shadow-xl z-30 flex"
                style={{ minHeight: 380, minWidth: 530 }}
              >
                
                <div className="flex flex-col w-60 p-4 border-r">
                  {categories.map((cat, idx) => (
                    <div
                      key={cat._id}
                      onMouseEnter={() => setActiveCategoryIdx(idx)}
                      onClick={() => handleCategoryClick(cat._id)}
                      className={
                        "flex items-center gap-3 px-2 py-2  rounded cursor-pointer" +
                        (idx === activeCategoryIdx ? " font-semibold bg-gray-50" : "")
                      }
                      
                    >
                      {cat.imageUrl && (
                        <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${cat.imageUrl}`}
                          alt={cat.name}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      )}
                      <span
                        className={idx === activeCategoryIdx ? "text-base" : ""}
                      >
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subcategories of active category */}
                <div className="flex flex-col flex-1 p-4 gap-2">
                  {(categories[activeCategoryIdx]?.subcategories || []).length > 0 ? (
                    categories[activeCategoryIdx].subcategories.map((subcat) => (
                      <span
                        key={subcat._id || subcat.name}
                        onClick={() =>
                          handleSubcategoryClick(
                            categories[activeCategoryIdx]._id,
                            subcat.name
                          )
                        }
                        className="font-medium text-gray-700 mb-2 cursor-pointer hover:text-[#e11d48]"
                      >
                        {subcat.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 mt-16">No subcategories</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={`${
              pathname === "/wishlist"
                ? "text-[#e11d48] font-medium"
                : "text-gray-700 hover:text-[#e11d48]"
            } relative flex items-center gap-3`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-base font-medium">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute right-0 bg-[#e11d48] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className={`relative ${getLinkClass("/cart")}`}>
            <ShoppingCart className="w-5 h-5" />
            <span className="text-base font-normal">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#e11d48] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm flex justify-end">
          <div className="bg-white w-64 h-full shadow-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X size={26} className="text-gray-700 hover:text-gray-900" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              <Link
                href="/store"
                onClick={() => setMenuOpen(false)}
                className={`${
                  pathname === "/store"
                    ? "text-[#e11d48] font-medium"
                    : "text-gray-700 hover:text-[#e11d48]"
                } flex items-center gap-3`}
              >
                <Store className="w-5 h-5" />
                <span className="text-base font-medium">Store</span>
              </Link>
              <Link
            href="/wishlist"
            className={`${
              pathname === "/wishlist"
                ? "text-[#e11d48] font-medium"
                : "text-gray-700 hover:text-[#e11d48]"
            } relative flex items-center gap-3`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-base font-medium">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute right-0 bg-[#e11d48] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className={getLinkClass("/cart") + " flex items-center gap-3 relative"}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-base font-medium">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute right-0 bg-[#e11d48] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
