import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/app/model/Category";
import cloudinary from "@/lib/cloudinary";

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

// ========================= GET ALL CATEGORIES =========================
export async function GET() {
  await connectDB();
  let categories = await Category.find();

  categories = categories.sort(
    (a, b) => (priority[a.name] || 999) - (priority[b.name] || 999)
  );

  return NextResponse.json(categories);
}

// ========================= CREATE CATEGORY (POST) =========================
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const name = formData.get("name");
    const imageFile = formData.get("image");
    const subcategories = formData.get("subcategories");

    let imageUrl = null;

    // ⭐ Upload main category image to Cloudinary
    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${buffer.toString("base64")}`,
        { folder: "categories" }
      );

      imageUrl = uploaded.secure_url;
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

  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
