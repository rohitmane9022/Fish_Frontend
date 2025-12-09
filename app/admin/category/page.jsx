"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CategoryManagement() {
  const [allowed, setAllowed] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: null,
    subcategories: [],
  });

  // ================================================
  // 🔐 LOGIN PROTECTION
  // ================================================
  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn");
    if (logged === "true") setAllowed(true);
    else window.location.href = "/admin/login";
  }, []);

  // ================================================
  // 📦 FETCH CATEGORIES
  // ================================================
  const fetchCategories = () => {
    setLoadingCategories(true);

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch(() => setLoadingCategories(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!allowed) return null;

  // ================================================
  // 🧰 FORM HANDLERS
  // ================================================
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

  const updateSub = (idx, key, value) => {
    const updated = [...form.subcategories];
    updated[idx][key] = value;
    setForm({ ...form, subcategories: updated });
  };

  const updateSubImage = (idx, file) => {
    const updated = [...form.subcategories];
    updated[idx].image = file;
    updated[idx].preview = URL.createObjectURL(file);
    setForm({ ...form, subcategories: updated });
  };

  const removeSub = (idx) => {
    const updated = [...form.subcategories];
    updated.splice(idx, 1);
    setForm({ ...form, subcategories: updated });
  };

  const resetForm = () => {
    setForm({ name: "", image: null, subcategories: [] });
    setImagePreview(null);
    setEditing(null);
    setShowForm(false);
    setLoadingSubmit(false);
  };

  // ================================================
  // 💾 SUBMIT CATEGORY
  // ================================================
  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error("Category name required");

    setLoadingSubmit(true);

    const fd = new FormData();
    fd.append("name", form.name);
    if (form.image) fd.append("image", form.image);

    const subPayload = form.subcategories.map((s, idx) => {
      if (s.image) fd.append(`subImage_${idx}`, s.image);
      return { name: s.name };
    });

    fd.append("subcategories", JSON.stringify(subPayload));

    const url = editing ? `/api/categories/${editing._id}` : `/api/categories`;
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });

    if (res.ok) {
      toast.success(editing ? "Updated!" : "Created!");
      resetForm();
      fetchCategories();
    } else {
      toast.error("Failed to save");
      setLoadingSubmit(false);
    }
  };

  // ================================================
  // ❌ DELETE CATEGORY
  // ================================================
  const deleteCategory = async (id) => {
    if (!confirm("Delete category?")) return;

    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Deleted");
      fetchCategories();
    } else toast.error("Failed to delete");
  };

  // ================================================
  // ⏳ LOADING SCREEN
  // ================================================
  if (loadingCategories) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg animate-pulse">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* ⭐⭐⭐ STICKY TOP BAR (TITLE + BUTTON) ⭐⭐⭐ */}
      <div className="sticky top-[70px] z-50 bg-white border-b py-4 mb-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Category Management</h1>

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
      </div>

      {/* ⭐ MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-[999]">
          <div className="bg-white p-6 rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
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

            {/* FORM CONTENT */}
            <div className="space-y-5">
              {/* Category Name */}
              <div>
                <label className="text-sm font-medium">Category Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="border p-3 w-full rounded-lg mt-1"
                />
              </div>

              {/* Category Image */}
              <div>
                <label className="text-sm font-medium">Category Image</label>

                <label className="mt-2 flex items-center gap-3 cursor-pointer bg-gray-100 p-3 rounded-lg border">
                  <span className="bg-black text-white px-4 py-2 rounded-lg">
                    Upload
                  </span>
                  <span>{form.image?.name || "Choose Image"}</span>
                  <input type="file" onChange={handleImageChange} className="hidden" />
                </label>

                {(imagePreview || editing?.imageUrl) && (
                  <Image
                    src={imagePreview || editing.imageUrl}
                    width={130}
                    height={130}
                    alt="preview"
                    className="mt-3 rounded-lg border"
                  />
                )}
              </div>

              {/* SUBCATEGORIES */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Subcategories</h3>
                  <button
                    onClick={addSubcategory}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                  >
                    + Add Subcategory
                  </button>
                </div>

                <div className="space-y-3">
                  {form.subcategories.map((sub, i) => (
                    <div key={i} className="border rounded-lg p-4 bg-gray-50">

                      {/* NAME */}
                      <input
                        value={sub.name}
                        placeholder="Subcategory Name"
                        onChange={(e) => updateSub(i, "name", e.target.value)}
                        className="border p-2 rounded-lg w-full"
                      />

                      {/* IMAGE */}
                      <label className="mt-2 block cursor-pointer bg-white border p-2 rounded-lg">
                        <span className="bg-black text-white px-3 py-1 rounded">
                          Upload
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
                          className="rounded mt-2 border"
                          alt=""
                        />
                      )}

                      <button
                        onClick={() => removeSub(i)}
                        className="mt-2 bg-red-600 text-white px-4 py-1 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={loadingSubmit}
                className="w-full bg-black text-white py-3 rounded-lg text-lg disabled:opacity-50"
              >
                {loadingSubmit ? "Saving..." : editing ? "Update Category" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CATEGORY LIST ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {categories.map((cat) => (
          <div key={cat._id} className="border p-4 rounded-xl shadow bg-white">

            {/* Category Image */}
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

            {/* Subcategories */}
            {cat.subcategories.length > 0 && (
              <ul className="mt-2 ml-4 list-disc text-gray-700 text-sm">
                {cat.subcategories.map((s) => (
                  <li key={s._id}>{s.name}</li>
                ))}
              </ul>
            )}

            <div className="flex gap-3 mt-5">
              {/* EDIT */}
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
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteCategory(cat._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
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
