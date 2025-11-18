// scripts/migrateProducts.js
import { connectDB } from "./lib/db";
import Product from "./app/model/Product";

async function run() {
  await connectDB();
  const products = await Product.find({});
  for (const p of products) {
    let changed = false;
    if (!p.weightOptions || p.weightOptions.length === 0) {
      if (p.weight) {
        p.weightOptions = [p.weight];
        changed = true;
      }
    }
    if (changed) {
      await p.save();
      console.log("Updated", p._id);
    }
  }
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
