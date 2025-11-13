// dbSeed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./app/model/Category.js"; 

dotenv.config(); 

// 🟩 Connect to MongoDB
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI not found in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

// 🟨 Categories to insert
const categories = [
  {
    name: "Fish",
    imageUrl: "/image/fish.png",
    subcategories: [
      { name: "Sea Water", imageUrl: "/image/seawater.png" },
      { name: "Fresh Water", imageUrl: "/image/freshwater.png" },
      { name: "Prawns", imageUrl: "/image/prawns.png" },
    ],
  },
  {
    name: "Fresh Chicken",
    imageUrl: "/image/chicken.png",
    subcategories: [{ name: "Raw", imageUrl: "/image/chicken.png" }],
  },
  {
    name: "Zorabian",
    imageUrl: "/image/z.png",
    subcategories: [
      { name: "Raw Chicken", imageUrl: "/image/z.png" },
      { name: "Ready to Cook Item", imageUrl: "/image/z.png" },
    ],
  },
  {
    name: "Venky’s (Ready to Cook Product)",
    imageUrl: "/image/v.png",
    subcategories: [],
  },
  {
    name: "Captain Cook (Ready to Cook Product)",
    imageUrl: "/image/c.png",
    subcategories: [],
  },
  {
    name: "Gadre (Ready to Cook Fish)",
    imageUrl: "/image/g.png",
    subcategories: [],
  },
  {
    name: "McCain (Ready to Cook Product)",
    imageUrl: "/image/mccain.png",
    subcategories: [],
  },
  {
    name: "Green Peas",
    imageUrl: "/image/peers.png",
    subcategories: [],
  },
  {
    name: "Paratha",
    imageUrl: "/image/parata.png",
    subcategories: [],
  },
];

// 🟦 Seed database
async function seedDatabase() {
  try {
    await connectDB();

    await Category.deleteMany({});
    console.log("🧹 Old categories removed.");

    await Category.insertMany(categories);
    console.log("✅ New categories added successfully!");

    mongoose.connection.close();
    console.log("🚪 Connection closed.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase();
