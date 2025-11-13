import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/app/model/Category";

// ✅ GET: All Categories
export async function GET() {
  await connectDB();
  const categories = await Category.find();
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

  // If you upload the image using Next.js static public folder
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
