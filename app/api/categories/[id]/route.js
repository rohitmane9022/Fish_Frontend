import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/app/model/Category";
import cloudinary from "@/lib/cloudinary";

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const formData = await req.formData();

    const name = formData.get("name");
    const mainImage = formData.get("image");
    const subcats = JSON.parse(formData.get("subcategories") || "[]");

    let mainImageUrl = null;

    // Upload main image only if provided
    if (mainImage && mainImage.size > 0) {
      const buffer = Buffer.from(await mainImage.arrayBuffer());

      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(buffer);
      });

      mainImageUrl = uploaded.secure_url;
    }

    // Load existing category for subcategory images
    const oldCategory = await Category.findById(id);

    // Build final subcategories output
    const finalSubs = [];

    for (let i = 0; i < subcats.length; i++) {
      const sub = subcats[i];

      // Read file input
      const file = formData.get(`subImage_${i}`);

      let imageUrl = sub?.imageUrl || null;

      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "subcategories" },
            (err, result) => (err ? reject(err) : resolve(result))
          ).end(buffer);
        });

        imageUrl = uploaded.secure_url;
      }

      // Use old image if no new file AND editing existing subcategory
      if (!imageUrl && oldCategory.subcategories[i]) {
        imageUrl = oldCategory.subcategories[i].imageUrl;
      }

      finalSubs.push({
        name: sub.name,
        imageUrl,
      });
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(mainImageUrl && { imageUrl: mainImageUrl }),
        subcategories: finalSubs,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
