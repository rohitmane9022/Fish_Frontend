import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const filter = {};

    if (searchParams.get("category"))
      filter.category = searchParams.get("category");

    if (searchParams.get("subcategory"))
      filter.subcategory = searchParams.get("subcategory");

    const products = await Product.find(filter);
    return NextResponse.json(products);
  } catch (err) {
    console.error("❌ GET /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  await connectDB();
  const formData = await req.formData();

  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  if (data.tags) data.tags = JSON.parse(data.tags);
  if (data.highlights) data.highlights = JSON.parse(data.highlights);
  if (data.nutrition) data.nutrition = JSON.parse(data.nutrition);

  data.price = Number(data.price);
  data.originalPrice = Number(data.originalPrice);
  data.isHit = data.isHit === "true";

  // 🔥 CLOUDINARY UPLOAD
  let imageUrl = null;
  const imageFile = formData.get("image");

  if (imageFile && imageFile.name) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${buffer.toString("base64")}`,
      {
        folder: "products",
      }
    );

    imageUrl = uploaded.secure_url;
  }

  data.imageUrl = imageUrl;

  const product = await Product.create(data);

  return NextResponse.json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
}
