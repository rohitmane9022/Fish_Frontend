"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductManagement() {
  
  const [allowed, setAllowed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    category: "",
    subcategory: "",
    tags: "",
    weight: "",
    pieces: "",
    serves: "",
    highlights: "",
    image: null,
    isHit: false,
    nutrition: {
      energy: "",
      carbohydrate: "",
      fat: "",
      protein: "",
    },
  });

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  

  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn");
    if (logged === "true") {
      setAllowed(true);
    } else {
      window.location.href = "/admin/login";
    }
    
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

 
  useEffect(() => {
    fetchProducts();
  }, []);

  if (!allowed) return null;


  const selectedCategory = categories.find(
    (cat) => cat.name === formData.category
  );
  const subcategories = selectedCategory?.subcategories || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("nutrition.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        nutrition: { ...formData.nutrition, [key]: value },
      });
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
      tags: product.tags?.join(", ") || "",
      weight: product.weight || "",
      pieces: product.pieces || "",
      serves: product.serves || "",
      highlights: product.highlights?.join(", ") || "",
      image: null,
      isHit: product.isHit || false,
      nutrition: {
        energy: product.nutrition?.energy || "",
        carbohydrate: product.nutrition?.carbohydrate || "",
        fat: product.nutrition?.fat || "",
        protein: product.nutrition?.protein || "",
      },
    });

    if (product.imageUrl) {
      setImagePreview(product.imageUrl);
    }
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
      tags: "",
      weight: "",
      pieces: "",
      serves: "",
      highlights: "",
      image: null,
      isHit: false,
      nutrition: {
        energy: "",
        carbohydrate: "",
        fat: "",
        protein: "",
      },
    });
    setImagePreview(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    const selectedCategoryObj = categories.find(
      (cat) => cat.name === formData.category
    );

    if (
      selectedCategoryObj?.subcategories?.length > 0 &&
      !formData.subcategory
    ) {
      alert("Please select a subcategory");
      return;
    }

    const data = new FormData();

    const categoryObj = categories.find((cat) => cat.name === formData.category);
    if (categoryObj) data.append("category", categoryObj._id);

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("isHit", formData.isHit);

    if (formData.subcategory) data.append("subcategory", formData.subcategory);
    if (formData.originalPrice)
      data.append("originalPrice", formData.originalPrice);
    if (formData.discount) data.append("discount", formData.discount);
    if (formData.description) data.append("description", formData.description);
    if (formData.weight) data.append("weight", formData.weight);
    if (formData.pieces) data.append("pieces", formData.pieces);
    if (formData.serves) data.append("serves", formData.serves);

    if (formData.tags)
      data.append(
        "tags",
        JSON.stringify(formData.tags.split(",").map((t) => t.trim()))
      );

    if (formData.highlights)
      data.append(
        "highlights",
        JSON.stringify(formData.highlights.split(",").map((h) => h.trim()))
      );

    data.append("nutrition", JSON.stringify(formData.nutrition));

    if (formData.image) data.append("image", formData.image);

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : `/api/products`;

      const res = await fetch(url, {
        method: editingProduct ? "PUT" : "POST",
        body: data,
      });

      if (res.ok) {
        alert(editingProduct ? "Product updated!" : "Product added!");
        resetForm();
        fetchProducts();
      } else {
        alert("Failed to save product");
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Product deleted!");
        fetchProducts();
      } else alert("Failed to delete");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  
  return (
    <div className="max-w-7xl mx-auto my-10 px-4">

      <div className="flex justify-end mb-5">
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

     
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Create New Product
        </button>
      </div>

      
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
              
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product name *"
                className="border rounded-lg p-2 w-full"
              />

            
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border rounded-lg p-2 w-full min-h-20"
              />

              {/* Category */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {selectedCategory?.subcategories?.length > 0 ? (
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
                  <input
                    readOnly
                    className="border p-2 rounded-lg w-full bg-gray-100"
                    placeholder="No subcategory"
                  />
                )}
              </div>

              {/* Pricing */}
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

              {/* Weight / Pieces / Serves */}
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

              {/* Tags */}
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="border rounded-lg p-2 w-full"
              />

              {/* Highlights */}
              <input
                type="text"
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                placeholder="Highlights (comma separated)"
                className="border rounded-lg p-2 w-full"
              />

              {/* Hit Product */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isHit"
                  checked={formData.isHit}
                  onChange={handleChange}
                />
                <label>Is Hit Product?</label>
              </div>

              {/* Nutrition */}
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

              {/* Image */}
              <div className="space-y-2">
  <label className="font-medium text-sm text-gray-700">Product Image</label>

  {/* Upload Box */}
  <div className="flex items-center gap-4">
    <label
      htmlFor="product-image"
      className="cursor-pointer bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
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

    <span className="text-xs text-gray-500">
      JPG, PNG or JPEG (max 5MB)
    </span>
  </div>

  {/* Preview */}
  {imagePreview && (
    <div className="mt-3">
      <Image
        src={imagePreview}
        width={130}
        height={130}
        alt="Product Preview"
        className="w-32 h-32 object-cover border rounded-xl shadow-sm"
      />
    </div>
  )}
</div>


              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  {editingProduct ? "Update" : "Add"}
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

      {/* ---------------- PRODUCT LIST ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {product.category?.name}{" "}
              {product.subcategory && `- ${product.subcategory}`}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold">₹{product.price}</span>

              {product.originalPrice && (
                <>
                  <span className="line-through text-gray-500 text-sm">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-green-600 text-sm font-medium">
                    {product.discount}
                  </span>
                </>
              )}
            </div>

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
