import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ParadipService API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/hero-slides", heroRoutes);
app.use("/api/testimonials", testimonialRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
