import express from "express";
import { findUser, getUsersByIds } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Find user by username or email
router.get("/find", protect, findUser);

// Get multiple users by their IDs
router.get("/students", protect, getUsersByIds);

export default router; 