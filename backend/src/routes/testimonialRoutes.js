import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  getTestimonialsAdmin,
  updateTestimonial
} from "../controllers/testimonialController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.get("/admin/all", protectAdmin, getTestimonialsAdmin);
router.post("/", protectAdmin, createTestimonial);
router.put("/:id", protectAdmin, updateTestimonial);
router.delete("/:id", protectAdmin, deleteTestimonial);

export default router;
