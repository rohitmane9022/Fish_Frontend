import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";
import fs from "fs";
import path from "path";

// ✅ GET all products
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const filter = {};

  if (searchParams.get("category"))
    filter.category = searchParams.get("category");
  if (searchParams.get("subcategory"))
    filter.subcategory = searchParams.get("subcategory");

  const products = await Product.find(filter).populate("category");
  return NextResponse.json(products);
}

// ✅ POST new product
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
  if (data.price) data.price = Number(data.price);
  if (data.originalPrice) data.originalPrice = Number(data.originalPrice);
  if (data.isHit) data.isHit = data.isHit === "true";

  // ✅ Handle file upload
  let imageUrl = null;
  const imageFile = formData.get("image");
  if (imageFile && typeof imageFile.name === "string") {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    imageUrl = `/uploads/${fileName}`;
  }

  data.imageUrl = imageUrl;

  const product = await Product.create(data);

  return NextResponse.json({
    success: true,
    message: "✅ Product created successfully",
    data: product,
  });
}
