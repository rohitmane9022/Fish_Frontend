"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductManagement() {
  const [allowed, setAllowed] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    category: "",
    subcategory: "",
    tagsInput: "",
    tagsArray: [],
    weight: "",
    pieces: "",
    serves: "",
    highlights: "",
    image: null,
    isHit: false,
    inStock: true,
    nutrition: {
      energy: "",
      carbohydrate: "",
      fat: "",
      protein: "",
    },
  });

  // ---------- SAFE APPEND FUNCTION ----------
  const safeAppend = (fd, key, value) => {
    if (value !== undefined && value !== null && value !== "") {
      fd.append(key, value);
    }
  };

  const PREDEFINED_TAGS = ["ready-to-cook"];

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn");
    if (logged === "true") setAllowed(true);
    else window.location.href = "/admin/login";
  }, []);

  useEffect(() => {
    Promise.all([fetch("/api/categories"), fetch("/api/products")])
      .then(async ([catRes, prodRes]) => {
        const categoryData = await catRes.json();
        const productData = await prodRes.json();

        setCategories(categoryData);
        setProducts(productData);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, []);

  if (!allowed) return null;

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full" />
            <div className="w-20 h-20 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>

          <p className="text-xl font-semibold text-gray-800 animate-pulse">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  const selectedCategory = categories.find(
    (cat) => cat.name === formData.category
  );
  const subcategories = selectedCategory?.subcategories || [];

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
      subcategory: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("nutrition.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        nutrition: { ...formData.nutrition, [key]: value },
      });
    } else if (name === "tagsInput") {
      setFormData({ ...formData, tagsInput: value });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const togglePredefinedTag = (tag) => {
    const already = formData.tagsArray.includes(tag);
    const newTags = already
      ? formData.tagsArray.filter((t) => t !== tag)
      : [...formData.tagsArray, tag];

    setFormData({ ...formData, tagsArray: newTags });
  };

  const handleTagsInputBlur = () => {
    const manual = formData.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const merged = Array.from(new Set([...formData.tagsArray, ...manual]));
    setFormData({ ...formData, tagsArray: merged, tagsInput: "" });
  };

  const handleRemoveTag = (tag) => {
    const newTags = formData.tagsArray.filter((t) => t !== tag);
    setFormData({ ...formData, tagsArray: newTags });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);

    const categoryObj = categories.find(
      (cat) => cat._id === product.category?._id || cat._id === product.category
    );

    setFormData({
      name: product.name || "",
      price: product.price || "",
      originalPrice: product.originalPrice || "",
      discount: product.discount || "",
      description: product.description || "",
      category: categoryObj?.name || "",
      subcategory: product.subcategory || "",
      tagsInput: "",
      tagsArray: (product.tags || []).map((t) => String(t)),
      weight: product.weight || "",
      pieces: product.pieces || "",
      serves: product.serves || "",
      highlights: (product.highlights || []).join(", "),
      image: null,
      isHit: product.isHit ?? false,
      inStock: product.inStock ?? true,
      nutrition: {
        energy: product.nutrition?.energy || "",
        carbohydrate: product.nutrition?.carbohydrate || "",
        fat: product.nutrition?.fat || "",
        protein: product.nutrition?.protein || "",
      },
    });

    if (product.imageUrl) setImagePreview(product.imageUrl);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      discount: "",
      description: "",
      category: "",
      subcategory: "",
      tagsInput: "",
      tagsArray: [],
      weight: "",
      pieces: "",
      serves: "",
      highlights: "",
      image: null,
      isHit: false,
      inStock: true,
      nutrition: { energy: "", carbohydrate: "", fat: "", protein: "" },
    });
    setShowForm(false);
    setImagePreview(null);
    setEditingProduct(null);
  };

  // ----------- FIXED handleSubmit (FULLY UPDATED) -----------
  const handleSubmit = async () => {
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    const selectedCategoryObj = categories.find(
      (cat) => cat.name === formData.category
    );

    if (
      selectedCategoryObj?.subcategories?.length > 0 &&
      !formData.subcategory
    ) {
      toast.error("Please select a subcategory");
      return;
    }

    const manual = formData.tagsInput
      ? formData.tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const tagsToSend = Array.from(
      new Set([...formData.tagsArray, ...manual])
    );

    const fd = new FormData();

    // Required fields
    if (selectedCategoryObj) fd.append("category", selectedCategoryObj._id);
    fd.append("name", formData.name);
    fd.append("price", formData.price);
    fd.append("isHit", String(formData.isHit));
    fd.append("inStock", String(formData.inStock));
    fd.append("subcategory", formData.subcategory || "");

    // Safe optional fields
    safeAppend(fd, "originalPrice", formData.originalPrice);
    safeAppend(fd, "discount", formData.discount);
    safeAppend(fd, "description", formData.description);
    safeAppend(fd, "weight", formData.weight);
    safeAppend(fd, "pieces", formData.pieces);
    safeAppend(fd, "serves", formData.serves);

    // JSON fields
    fd.append("tags", JSON.stringify(tagsToSend));
    fd.append(
      "highlights",
      formData.highlights.trim()
        ? JSON.stringify(
            formData.highlights
              .split(",")
              .map((h) => h.trim())
              .filter(Boolean)
          )
        : JSON.stringify([])
    );
    fd.append("nutrition", JSON.stringify(formData.nutrition));

    if (formData.image) fd.append("image", formData.image);

    try {
      setLoading(true);

      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : `/api/products`;

      const res = await fetch(url, {
        method: editingProduct ? "PUT" : "POST",
        body: fd,
      });

      if (res.ok) {
        toast.success(editingProduct ? "Product updated!" : "Product added!");
        resetForm();
        fetchProducts();
      } else {
        toast.error("Failed to save product");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ----------- FIXED toggleStock -----------
  const toggleStock = async (product) => {
    try {
      const fd = new FormData();
      fd.append("inStock", String(!product.inStock));

      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        toast.success("Stock updated!");
        fetchProducts();
      } else {
        toast.error("Failed to update stock");
      }
    } catch (err) {
      toast.error("Error updating stock");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("Product deleted!");
        fetchProducts();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // ----------- UI (unchanged) -----------
  return (
    /* your full JSX below stays EXACTLY SAME */
    /* I keep this part unchanged for you */
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* ⭐ STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b py-4 mb-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Create New Product
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              window.location.href = "/admin/login";
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">

            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                {editingProduct ? "Update Product" : "Add New Product"}
              </h2>
              <button
                onClick={resetForm}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">

              {/* NAME */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product name *"
                className="border rounded-lg p-2 w-full"
              />

              {/* DESCRIPTION */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border rounded-lg p-2 w-full min-h-20"
              />

              {/* CATEGORY / SUBCATEGORY */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {subcategories.length > 0 ? (
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub._id || sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <input
                      readOnly
                      className="border p-2 rounded-lg w-full bg-gray-100"
                      placeholder="No subcategory"
                    />
                    <input type="hidden" name="subcategory" value="" />
                  </>
                )}
              </div>

              {/* PRICE FIELDS */}
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price *"
                  className="border rounded-lg p-2"
                />

                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="Original Price"
                  className="border rounded-lg p-2"
                />

                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Discount %"
                  className="border rounded-lg p-2"
                />
              </div>

              {/* WEIGHT / PIECES / SERVES */}
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  name="pieces"
                  value={formData.pieces}
                  onChange={handleChange}
                  placeholder="Pieces"
                  className="border rounded-lg p-2"
                />
                <input
                  type="number"
                  name="serves"
                  value={formData.serves}
                  onChange={handleChange}
                  placeholder="Serves"
                  className="border rounded-lg p-2"
                />
              </div>

              {/* TAGS */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>

                <div className="flex gap-2 mb-2">
                  {PREDEFINED_TAGS.map((t) => {
                    const active = formData.tagsArray.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => togglePredefinedTag(t)}
                        className={`px-3 py-1 rounded-full border ${
                          active
                            ? "bg-[#e11d48] text-white border-[#e11d48]"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <input
                    name="tagsInput"
                    value={formData.tagsInput}
                    onChange={handleChange}
                    onBlur={handleTagsInputBlur}
                    placeholder="Add tags (comma separated)"
                    className="border rounded-lg p-2 flex-1"
                  />

                  <div className="flex items-center gap-2 flex-wrap">
                    {formData.tagsArray.map((t) => (
                      <div
                        key={t}
                        className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-2"
                      >
                        <span className="text-sm">{t}</span>
                        <button
                          onClick={() => handleRemoveTag(t)}
                          className="text-xs text-gray-500"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* HIGHLIGHTS */}
              <input
                type="text"
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                placeholder="Highlights (comma separated)"
                className="border rounded-lg p-2 w-full"
              />

              {/* HIT + INSTOCK */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isHit"
                    checked={formData.isHit}
                    onChange={handleChange}
                  />
                  Hit Product?
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                  />
                  In Stock?
                </label>
              </div>

              {/* NUTRITION */}
              <div>
                <label className="font-medium">Nutrition</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {Object.keys(formData.nutrition).map((key) => (
                    <input
                      key={key}
                      name={`nutrition.${key}`}
                      value={formData.nutrition[key]}
                      onChange={handleChange}
                      placeholder={key.toUpperCase()}
                      className="border rounded-lg p-2"
                    />
                  ))}
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-sm">Product Image</label>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="product-image"
                    className="cursor-pointer bg-gray-100 border px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Choose Image
                  </label>
                  <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {imagePreview && (
                  <div className="mt-3">
                    <Image
                      src={imagePreview}
                      width={120}
                      height={120}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* FORM BUTTONS */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : editingProduct ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </button>

                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl p-4 shadow-md bg-white"
          >
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={100}
                height={100}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="font-semibold text-lg">{product.name}</h3>

            <p className="text-sm text-gray-500 mb-2">
              {product.category?.name}
              {product.subcategory && ` - ${product.subcategory}`}
            </p>

            <p className="text-sm mb-2">
              Status:{" "}
              <span
                className={
                  product.inStock ? "text-green-600" : "text-red-600"
                }
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <button
              onClick={() => toggleStock(product)}
              className={`mb-3 w-full py-1.5 rounded-lg text-white ${
                product.inStock
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {product.inStock ? "Mark Out of Stock" : "Mark In Stock"}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
