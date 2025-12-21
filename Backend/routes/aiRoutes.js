// routes/aiRoute.js
import express from "express";
import { askMedicalAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask", askMedicalAI);

export default router;
