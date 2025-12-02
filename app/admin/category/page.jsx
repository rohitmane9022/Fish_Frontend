"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CategoryManagement() {
  const [allowed, setAllowed] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true); // ⭐ ADDED

  const [loadingSubmit, setLoadingSubmit] = useState(false); // ⭐ ADDED

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: null,
    subcategories: [],
  });

  // LOGIN PROTECTION
  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn");
    if (logged === "true") setAllowed(true);
    else window.location.href = "/admin/login";
  }, []);

  // FETCH CATEGORIES
  const fetchCategories = () => {
    setLoadingCategories(true); // ⭐ start loader

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false); // ⭐ stop loader
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoadingCategories(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!allowed) return null;

  // ---------- Form Handlers ----------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const addSubcategory = () => {
    setForm({
      ...form,
      subcategories: [
        ...form.subcategories,
        { name: "", image: null, preview: null },
      ],
    });
  };

  const updateSub = (index, key, value) => {
    const updated = [...form.subcategories];
    updated[index][key] = value;
    setForm({ ...form, subcategories: updated });
  };

  const updateSubImage = (index, file) => {
    const updated = [...form.subcategories];
    updated[index].image = file;
    updated[index].preview = URL.createObjectURL(file);
    setForm({ ...form, subcategories: updated });
  };

  const removeSub = (index) => {
    const updated = [...form.subcategories];
    updated.splice(index, 1);
    setForm({ ...form, subcategories: updated });
  };

  const resetForm = () => {
    setForm({ name: "", image: null, subcategories: [] });
    setImagePreview(null);
    setEditing(null);
    setShowForm(false);
    setLoadingSubmit(false);
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error("Category name required");

    setLoadingSubmit(true); // ⭐ show loader

    const fd = new FormData();
    fd.append("name", form.name);
    if (form.image) fd.append("image", form.image);

    const subPayload = form.subcategories.map((sub, i) => {
      if (sub.image) fd.append(`subImage_${i}`, sub.image);
      return { name: sub.name };
    });

    fd.append("subcategories", JSON.stringify(subPayload));

    const url = editing ? `/api/categories/${editing._id}` : `/api/categories`;
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });

    if (res.ok) {
      toast.success(editing ? "Updated!" : "Added!");
      resetForm();
      fetchCategories();
    } else {
      toast.error("Failed to save");
      setLoadingSubmit(false);
    }
  };

  // ---------- DELETE ----------
  const deleteCategory = async (id) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Deleted");
      fetchCategories();
    } else toast.error("Failed to delete");
  };

  // =====================================================================
  //                     ⭐ PAGE LOADER FOR FETCH
  // =====================================================================
  if (loadingCategories) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-20">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full" />
            <div className="w-20 h-20 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>

          <p className="text-xl font-semibold text-gray-800 animate-pulse">
            Loading categories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          + Add Category
        </button>
      </div>

      {/* ======================= MODAL ======================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-xl font-semibold">
                {editing ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={resetForm}
                className="text-3xl leading-none text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* Category Name */}
              <div>
                <label className="font-medium text-sm">Category Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="border p-3 w-full rounded-lg mt-1 focus:ring-2 focus:ring-black/40 outline-none"
                />
              </div>

              {/* Category Image Upload */}
              <div>
                <label className="font-medium text-sm">Category Image</label>

                <label className="mt-2 flex items-center gap-3 cursor-pointer bg-gray-100 p-3 rounded-lg border hover:bg-gray-200 transition">
                  <span className="bg-black text-white px-4 py-2 rounded-lg">
                    Upload
                  </span>
                  <span className="text-gray-600">
                    {form.image?.name || "Choose Image"}
                  </span>
                  <input type="file" onChange={handleImageChange} className="hidden" />
                </label>

                {(imagePreview || editing?.imageUrl) && (
                  <Image
                    src={imagePreview || editing.imageUrl}
                    width={130}
                    height={130}
                    alt="preview"
                    className="mt-3 rounded-lg border shadow-sm"
                  />
                )}
              </div>

              {/* SUBCATEGORIES */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Subcategories</h3>
                  <button
                    onClick={addSubcategory}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                  >
                    + Add Subcategory
                  </button>
                </div>

                <div className="space-y-3">
                  {form.subcategories.map((sub, i) => (
                    <div key={i} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Subcategory Name</label>
                          <input
                            value={sub.name}
                            onChange={(e) => updateSub(i, "name", e.target.value)}
                            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-black/40 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">Subcategory Image</label>

                          <label className="mt-1 flex items-center gap-3 cursor-pointer bg-white border p-2 rounded-lg hover:bg-gray-100 transition">
                            <span className="bg-black text-white px-3 py-1 rounded">
                              Upload
                            </span>
                            <span className="text-gray-600 text-sm">
                              {sub.image?.name || "Choose Image"}
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => updateSubImage(i, e.target.files[0])}
                            />
                          </label>

                          {sub.preview && (
                            <Image
                              src={sub.preview}
                              width={90}
                              height={90}
                              alt="sub"
                              className="rounded-lg border shadow mt-3"
                            />
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeSub(i)}
                        className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBMIT BUTTON WITH LOADER */}
              <button
                onClick={handleSubmit}
                disabled={loadingSubmit}
                className="w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-900 transition disabled:opacity-60 flex items-center justify-center gap-3"
              >
                {loadingSubmit ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  editing ? "Update Category" : "Create Category"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {categories.map((cat) => (
          <div key={cat._id} className="border p-4 rounded-xl shadow bg-white hover:shadow-md transition">
            {cat.imageUrl && (
              <Image
                src={cat.imageUrl}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-3"
                alt={cat.name}
              />
            )}

            <h3 className="font-bold text-xl">{cat.name}</h3>

            {cat.subcategories.length > 0 && (
              <ul className="mt-3 text-sm text-gray-700 ml-4 list-disc">
                {cat.subcategories.map((s) => (
                  <li key={s._id}>{s.name}</li>
                ))}
              </ul>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => {
                  setEditing(cat);
                  setForm({
                    name: cat.name,
                    image: null,
                    subcategories: cat.subcategories.map((s) => ({
                      name: s.name,
                      image: null,
                      preview: s.imageUrl,
                    })),
                  });
                  setShowForm(true);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCategory(cat._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
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
