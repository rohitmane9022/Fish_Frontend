import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";


export async function GET(req, context) {
  await connectDB();
  const { id } = await context.params; 

  try {
    const product = await Product.findById(id);
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// 🟦 Update a product
export async function PUT(req, context) {
  await connectDB();
  const { id } = await context.params; // ✅ fix

  try {
    const formData = await req.formData();
    const updateData = {};

    for (const [key, value] of formData.entries()) {
      if (["tags", "highlights", "nutrition"].includes(key)) {
        updateData[key] = JSON.parse(value);
      } else if (["price", "originalPrice", "serves"].includes(key)) {
        updateData[key] = Number(value);
      } else if (key === "isHit") {
        updateData[key] = value === "true";
      } else {
        updateData[key] = value;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      message: "✅ Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("❌ PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// 🟥 Delete a product
export async function DELETE(req, context) {
  await connectDB();
  const { id } = await context.params; // ✅ fix

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      message: "🗑️ Product deleted successfully",
    });
  } catch (error) {
    console.error("❌ DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
