import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    subText: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    ctaText: { type: String, default: "Book Now", trim: true },
    ctaLink: { type: String, default: "/book-now", trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("HeroSlide", heroSlideSchema);
