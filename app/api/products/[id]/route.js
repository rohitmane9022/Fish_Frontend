import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";
import cloudinary from "@/lib/cloudinary";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params; // THIS is [id]

  try {
    const formData = await req.formData();
    const updateData = {};

    // Process text fields
    for (const [key, value] of formData.entries()) {
      if (key === "image") continue;

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

    // Get old product to delete old image
    const oldProduct = await Product.findById(id);

    const imageFile = formData.get("image");

    // If new image uploaded
    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${buffer.toString("base64")}`,
        { folder: "products" }
      );

      updateData.imageUrl = uploaded.secure_url;

      // Delete old image from cloudinary
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
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}
