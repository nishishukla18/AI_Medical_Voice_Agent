import express from "express";

import {
  createPost,
  getPosts,
  deletePost,
  toggleLike
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/",
  authMiddleware,
  createPost
);

router.delete(
  "/:id",
  authMiddleware,
  deletePost
);

router.post(
  "/:id/like",
  authMiddleware,
  toggleLike
);

export default router;