import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";
import cloudinary from "@/lib/cloudinary";

// GET all products
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const filter = {};

  if (searchParams.get("category")) filter.category = searchParams.get("category");
  if (searchParams.get("subcategory")) filter.subcategory = searchParams.get("subcategory");

  const products = await Product.find(filter).populate("category");
  return NextResponse.json(products);
}

// POST product
export async function POST(req) {
  await connectDB();
  const formData = await req.formData();

  const data = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "image") data[key] = value;
  }

  // Convert JSON fields
  if (data.tags) data.tags = JSON.parse(data.tags);
  if (data.highlights) data.highlights = JSON.parse(data.highlights);
  if (data.nutrition) data.nutrition = JSON.parse(data.nutrition);

  // Convert numbers
  if (data.price) data.price = Number(data.price);
  if (data.originalPrice) data.originalPrice = Number(data.originalPrice);
  if (data.serves) data.serves = Number(data.serves);
  if (data.isHit) data.isHit = data.isHit === "true";

  // ⭐ CLOUDINARY UPLOAD
  const imageFile = formData.get("image");
  let imageUrl = null;

  if (imageFile && imageFile.name) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${buffer.toString("base64")}`,
      { folder: "products" }
    );

    imageUrl = uploaded.secure_url;
  }

  data.imageUrl = imageUrl;

  // Create product
  const product = await Product.create(data);

  return NextResponse.json({
    success: true,
    message: "Product created!",
    data: product,
  });
}

