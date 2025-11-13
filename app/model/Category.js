import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
  subcategories: [subcategorySchema],
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
