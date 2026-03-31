import express from "express";
import {
  createHeroSlide,
  deleteHeroSlide,
  getHeroSlides,
  getHeroSlidesAdmin,
  updateHeroSlide
} from "../controllers/heroController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHeroSlides);
router.get("/admin/all", protectAdmin, getHeroSlidesAdmin);
router.post("/", protectAdmin, createHeroSlide);
router.put("/:id", protectAdmin, updateHeroSlide);
router.delete("/:id", protectAdmin, deleteHeroSlide);

export default router;
