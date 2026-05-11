import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  cancelBooking
} from "../controllers/bookingController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", protectAdmin, getBookings);
router.put("/:id", protectAdmin, updateBookingStatus);
router.delete("/:id", cancelBooking);

export default router;
