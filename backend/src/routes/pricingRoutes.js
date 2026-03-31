import express from "express";
import {
  getPricing,
  createPricing,
  updatePricing,
  deletePricing
} from "../controllers/pricingController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPricing);
router.post("/", protectAdmin, createPricing);
router.put("/:id", protectAdmin, updatePricing);
router.delete("/:id", protectAdmin, deletePricing);

export default router;
