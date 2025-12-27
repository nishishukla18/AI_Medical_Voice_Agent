import express from "express";
import { askMedicalAI } from "../controllers/aiController.js";
import { endSession } from "../controllers/endSessionController.js";
import { getMoodAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.post("/ask", askMedicalAI);        // chat replies
router.post("/end-session", endSession); // final analytics
router.get("/analytics", getMoodAnalytics); // history

export default router;
