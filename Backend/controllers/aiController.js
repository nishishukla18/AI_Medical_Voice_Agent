// import { GoogleGenerativeAI } from "@google/generative-ai";
// import sql from "../configs/db.js";

// // export const askMedicalAI = async (req, res) => {
// //   try {
// //     const { query } = req.body;

// //     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// //     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// //     const result = await model.generateContent(
// //       `You are a compassionate mental health buddy. 
// //       The user will share their current symptoms, feelings, or stressors. 
// //       Respond in a calm, supportive, and empathetic tone. 
// //       Offer practical, simple advice that can help the user feel better in the moment 
// //       (such as breathing exercises, grounding techniques, or positive reframing). 
// //       Always remind the user that your guidance does not replace professional medical or mental health advice, 
// //       and encourage them to seek support from a trusted person or professional if needed. 
// //       Keep your answers short, kind, and focused on immediate comfort.
// //       User symptoms: ${query}`
// //     );

// //     const reply = result.response.text();

// //     res.json({ reply });
// //   } catch (error) {
// //     console.error("SERVER ERROR:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // };


// export const askMedicalAI = async (req, res) => {
//   try {
//     const { query } = req.body;

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     /* ======================
//        1️⃣ MAIN AI RESPONSE
//     ======================= */
//     const mainPrompt = `
// You are a compassionate mental health buddy.
// Respond in a calm, supportive, empathetic tone.
// Offer simple grounding or breathing advice.
// Do NOT diagnose.
// Keep the response short.

// User symptoms: ${query}
// `;

//     const mainResult = await model.generateContent(mainPrompt);
//     const reply = mainResult.response.text();

//     /* ======================
//        2️⃣ MOOD ANALYTICS
//     ======================= */
//     const analyticsPrompt = `
// Analyze the following conversation.

// User: "${query}"
// AI: "${reply}"

// Return ONLY valid JSON:
// {
//   "emotion": "",
//   "summary": "",
//   "moodScore": number
// }

// Rules:
// - emotion: one word (anxious, calm, sad, stressed, hopeful)
// - moodScore: number from 1 to 5
// - summary: one short sentence
// `;

//   const analyticsResult = await model.generateContent(analyticsPrompt);

//     const analyticsText = analyticsResult.response
//       .text()
//       .replace(/```json|```/g, "")
//       .trim();

//     const analytics = JSON.parse(analyticsText);

//     /* ======================
//        3️⃣ STORE IN NEON DB
//     ======================= */
//     await sql`
//       INSERT INTO mood_analytics
//       (user_text, ai_reply, emotion, mood_score, summary)
//       VALUES
//       (${query}, ${reply}, ${analytics.emotion}, ${analytics.moodScore}, ${analytics.summary})
//     `;

//     /* ======================
//        4️⃣ RESPONSE
//     ======================= */
//     res.json({
//       reply,
//       analytics,
//     });
//   } catch (error) {
//     console.error("SERVER ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
// export const getMoodAnalytics = async (req, res) => {
//   try {
//     const data = await sql`
//       SELECT
//         emotion,
//         mood_score,
//         summary,
//         created_at
//       FROM mood_analytics
//       ORDER BY created_at DESC
//     `;

//     res.json(data);
//   } catch (error) {
//     console.error("FETCH ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


import { GoogleGenerativeAI } from "@google/generative-ai";

export const askMedicalAI = async (req, res) => {
  try {
    const { query, language = "English" } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a compassionate mental health buddy.
Reply in ${language}.
Be calm, empathetic, and supportive.
Offer simple grounding advice.
Do NOT diagnose.
Keep it short.

User: ${query}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    // ❌ NO ANALYTICS HERE
    res.json({ reply });
  } catch (error) {
    console.error("ASK AI ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
