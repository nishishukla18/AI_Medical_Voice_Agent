import { GoogleGenerativeAI } from "@google/generative-ai";
import sql from "../configs/db.js";

export const endSession = async (req, res) => {
  try {
    const { sessionMessages } = req.body;

    if (!sessionMessages || sessionMessages.length === 0) {
      return res.status(400).json({ error: "No session data provided" });
    }

    // Format conversation
    const conversation = sessionMessages
      .map(
        (msg, i) =>
          `Turn ${i + 1}:
User: ${msg.user}
AI: ${msg.ai}`
      )
      .join("\n\n");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const analyticsPrompt = `
Analyze this mental health conversation.

Conversation:
${conversation}

Return ONLY valid JSON:
{
  "emotion": "",
  "summary": "",
  "moodScore": number
}

Rules:
- emotion: one word
- moodScore: 1 to 5
- summary: 1–2 short sentences
- No diagnosis
`;

    const result = await model.generateContent(analyticsPrompt);

    const analyticsText = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    const analytics = JSON.parse(analyticsText);

    // ✅ STORE ONE SESSION RECORD
    await sql`
      INSERT INTO mood_analytics (emotion, mood_score, summary)
      VALUES (${analytics.emotion}, ${analytics.moodScore}, ${analytics.summary})
    `;

    res.json({ success: true });
  } catch (error) {
    console.error("END SESSION ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
