  // dbSeed.js
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  import Category from "./app/model/Category.js"; 
  import path from "path";
  import fs from "fs";
  import cloudinary from "./lib/cloudinary.js";

  dotenv.config();

  // Connect DB
  async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    }
  }

  // Upload image from /public/image to Cloudinary
  async function uploadFromPublic(imageName, folder = "categories") {
    const imagePath = path.join(process.cwd(), "public", "image", imageName);

    if (!fs.existsSync(imagePath)) {
      console.log("❌ Image not found:", imagePath);
      return null;
    }

    try {
      const uploaded = await cloudinary.uploader.upload(imagePath, {
        folder,
      });
      return uploaded.secure_url;
    } catch (error) {
      console.log("❌ Cloudinary upload error:", error.message);
      return null;
    }
  }

  // Category Data
  const categories = [
    {
      name: "Fish",
      image: "fish.png",
      subcategories: [
        { name: "Sea Water", image: "seawater.png" },
        { name: "Fresh Water", image: "freshwater.png" },
        { name: "Prawns", image: "prawns.png" },
      ],
    },
    {
      name: "Fresh Chicken",
      image: "chicken.png",
      subcategories: [{ name: "Raw", image: "chicken.png" }],
    },
    {
      name: "Zorabian",
      image: "z.png",
      subcategories: [
        { name: "Raw Chicken", image: "z.png" },
        { name: "Ready to Cook Item", image: "z.png" },
      ],
    },
    {
      name: "Venky’s (Ready to Cook Product)",
      image: "v.png",
      subcategories: [],
    },
    {
      name: "Captain Cook (Ready to Cook Product)",
      image: "c.png",
      subcategories: [],
    },
    {
      name: "Gadre (Ready to Cook Fish)",
      image: "g.png",
      subcategories: [],
    },
    {
      name: "McCain (Ready to Cook Product)",
      image: "mccain.png",
      subcategories: [],
    },
    {
      name: "Green Peas",
      image: "peers.png",
      subcategories: [],
    },
    {
      name: "Paratha",
      image: "parata.png",
      subcategories: [],
    },
  ];

  // Seed DB
  async function seedDB() {
    await connectDB();

    await Category.deleteMany({});
    console.log("🧹 Old categories removed");

    const finalCategories = [];

    for (const cat of categories) {
      console.log("📤 Uploading category:", cat.name);

      // Upload main category image
      const categoryImageUrl = await uploadFromPublic(cat.image);

      const subArray = [];
      for (const sub of cat.subcategories) {
        console.log("   ↳ Uploading subcategory:", sub.name);

        const subUrl = await uploadFromPublic(sub.image);
        subArray.push({
          name: sub.name,
          imageUrl: subUrl,
        });
      }

      finalCategories.push({
        name: cat.name,
        imageUrl: categoryImageUrl,
        subcategories: subArray,
      });
    }

    await Category.insertMany(finalCategories);

    console.log("🎉 Categories added successfully with Cloudinary URLs!");
    mongoose.connection.close();
    console.log("🔌 DB connection closed.");
  }

  seedDB();