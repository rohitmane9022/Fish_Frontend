import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema(
  {
    energy: String,
    carbohydrate: String,
    fat: String,
    protein: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  // ⭐ FIXED — subcategory NOT required
  subcategory: {
    type: String,
    default: "",
    required: false,
  },

  tags: [String],

  weight: { type: String, default: "" },
  pieces: { type: String, default: "" },
  serves: { type: Number, default: 1 },

  price: { type: Number, required: true },
  originalPrice: Number,
  discount: String,

  description: String,
  highlights: [String],

  imageUrl: String,
  nutrition: nutritionSchema,

  isHit: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
