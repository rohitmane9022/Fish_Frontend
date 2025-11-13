import mongoose from "mongoose";

let isConnected = true;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("❌ MONGODB_URI not found in .env file");

  try {
    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
