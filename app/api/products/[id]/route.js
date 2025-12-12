import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";
import cloudinary from "@/lib/cloudinary";

const safeNumber = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return isNaN(n) ? undefined : n;
};

export async function PUT(req, context) {
  await connectDB();
  const { id } = await context.params;

  try {
    const formData = await req.formData();
    const updateData = {};

    for (const [key, value] of formData.entries()) {
      if (key === "image") continue;

      if (["tags", "highlights", "nutrition"].includes(key)) {
        updateData[key] = JSON.parse(value);

      } else if (["price", "originalPrice", "discount", "serves"].includes(key)) {
        updateData[key] = safeNumber(value);

      } else if (key === "pieces") {
        updateData.pieces = value || "";  // ⭐ ALWAYS STRING

      } else if (key === "weight") {
        updateData.weight = value || "";  // ⭐ ALWAYS STRING

      } else if (key === "isHit") {
        updateData[key] = value === "true";

      } else if (key === "inStock") {
        updateData[key] = value === "true";

      } else {
        updateData[key] = value;
      }
    }

    if (!updateData.subcategory) updateData.subcategory = "";

    const oldProduct = await Product.findById(id);

    // IMAGE UPLOAD
    const imageFile = formData.get("image");
    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${buffer.toString("base64")}`,
        { folder: "products" }
      );

      updateData.imageUrl = uploaded.secure_url;

      if (oldProduct?.imageUrl) {
        const publicId = oldProduct.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Product updated!",
      data: updatedProduct,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}
export async function DELETE(req, context) {
  await connectDB();

  // ❗ FIX: must await params
  const { id } = await context.params;

  try {
    const product = await Product.findById(id);
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
