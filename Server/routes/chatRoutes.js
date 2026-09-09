import express from "express";

import {
  getMessages,
} from "../controllers/chatController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/messages",
  authMiddleware,
  getMessages
);

export default router;