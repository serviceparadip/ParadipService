import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    serviceName: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

pricingSchema.index({ category: 1, serviceName: 1 }, { unique: true });

export default mongoose.model("Pricing", pricingSchema);
