import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findById(params.id).populate("category");
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

// ✅ UPDATE Product
export async function PUT(req, { params }) {
  await connectDB();
  const id = params.id;
  const formData = await req.formData();

  const updateData = {};
  for (const [key, value] of formData.entries()) {
    if (["tags", "highlights", "nutrition"].includes(key)) {
      updateData[key] = JSON.parse(value);
    } else {
      updateData[key] = value;
    }
  }

  // ✅ Handle optional new image
  const imageFile = formData.get("image");
  if (imageFile && typeof imageFile.name === "string") {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    updateData.imageUrl = `/uploads/${fileName}`;
  }

  const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json({ success: true, data: updated });
}

// ✅ DELETE Product
export async function DELETE(req, { params }) {
  await connectDB();
  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ success: true, message: "Product deleted" });
}
