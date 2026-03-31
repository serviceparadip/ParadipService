import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    applianceType: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    model: { type: String, trim: true },
    tonnage: { type: String, trim: true },
    gasType: { type: String, trim: true },
    technicianName: { type: String, trim: true },
    serviceType: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Progress", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
