import express from "express";

import {
  createComment,
  getComments
} from "../controllers/commentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/:postId",
  getComments
);

router.post(
  "/:postId",
  authMiddleware,
  createComment
);

export default router;