import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/app/model/Category";

// Custom sorting priority
const priority = {
  "Fish": 1,
  "Fresh Chicken": 2,
  "Zorabian": 3,
  "Venky’s (Ready to Cook Product)": 4,
  "Captain Cook (Ready to Cook Product)": 5,
  "Gadre (Ready to Cook Fish)": 6,
  "McCain (Ready to Cook Product)": 7,
  "Green Peas": 8,
  "Paratha": 9,
};

// ✅ GET: All Categories
export async function GET() {
  await connectDB();
  let categories = await Category.find();

  // Apply sorting FIX
  categories = categories.sort(
    (a, b) => (priority[a.name] || 999) - (priority[b.name] || 999)
  );

  return NextResponse.json(categories);
}

// ✅ POST: Add Category
export async function POST(req) {
  await connectDB();
  const formData = await req.formData();

  const name = formData.get("name");
  const imageFile = formData.get("image");
  const subcategories = formData.get("subcategories");

  let imageUrl = null;

  if (imageFile && typeof imageFile.name === "string") {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${imageFile.name}`;
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    fs.writeFileSync(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  const category = new Category({
    name,
    imageUrl,
    subcategories: subcategories ? JSON.parse(subcategories) : [],
  });

  await category.save();

  return NextResponse.json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
}
