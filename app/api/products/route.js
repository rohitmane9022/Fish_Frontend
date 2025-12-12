import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";
import cloudinary from "@/lib/cloudinary";

// Utility: safely convert number fields
const safeNumber = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return isNaN(n) ? undefined : n;
};

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const filter = {};

  if (searchParams.get("category")) filter.category = searchParams.get("category");
  if (searchParams.get("subcategory")) filter.subcategory = searchParams.get("subcategory");

  const products = await Product.find(filter).populate("category");
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  const formData = await req.formData();

  const data = {};

  for (const [key, value] of formData.entries()) {
    if (key !== "image") data[key] = value;
  }

  // JSON fields
  if (data.tags) data.tags = JSON.parse(data.tags);
  if (data.highlights) data.highlights = JSON.parse(data.highlights);
  if (data.nutrition) data.nutrition = JSON.parse(data.nutrition);

  // Numbers
  data.price = safeNumber(data.price);
  data.originalPrice = safeNumber(data.originalPrice);
  data.discount = safeNumber(data.discount);
  data.serves = safeNumber(data.serves);

  // ⭐ STRING FIELDS
  data.weight = data.weight || "";
  data.pieces = data.pieces || "";

  data.isHit = data.isHit === "true";
  data.inStock = data.inStock === "true";

  if (!data.subcategory) data.subcategory = "";

  // IMAGE UPLOAD
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

  const product = await Product.create(data);

  return NextResponse.json({
    success: true,
    message: "Product created!",
    data: product,
  });
}
