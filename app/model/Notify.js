import mongoose from "mongoose";

const notifySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productName: String,
  },
  { timestamps: true }
);

export default mongoose.models.Notify ||
  mongoose.model("Notify", notifySchema);
