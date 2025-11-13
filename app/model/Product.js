import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  energy: String,
  carbohydrate: String,
  fat: String,
  protein: String,
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: String, required: true },
  tags: [String],
  weight: String,
  pieces: String,
  serves: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  discount: String,
  description: String,
  highlights: [String],
  imageUrl: String,
  nutrition: nutritionSchema,
  isHit: { type: Boolean, default: false },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
