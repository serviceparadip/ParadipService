import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", protectAdmin, getContacts);

export default router;
