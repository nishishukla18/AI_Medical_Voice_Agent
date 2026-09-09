import express from "express";
import { askMentalHealthAI } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chat",authMiddleware, askMentalHealthAI);      

export default router;
