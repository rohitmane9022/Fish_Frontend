import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/model/Product";

export async function GET() {
  await connectDB();

  // Add inStock: true only where it's missing
  const result = await Product.updateMany(
    { inStock: { $exists: false } },
    { $set: { inStock: true } }
  );

  return NextResponse.json({
    success: true,
    message: "inStock added to previous products",
    updated: result.modifiedCount,
  });
}
