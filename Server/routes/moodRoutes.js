import express from "express";

import {
  getMyMoods,
} from "../controllers/moodController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getMyMoods
);

export default router;