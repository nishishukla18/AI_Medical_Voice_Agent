import { GoogleGenerativeAI } from "@google/generative-ai";

export const askMedicalAI = async (req, res) => {
  try {
    const { query } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `You are a compassionate mental health buddy. 
      The user will share their current symptoms, feelings, or stressors. 
      Respond in a calm, supportive, and empathetic tone. 
      Offer practical, simple advice that can help the user feel better in the moment 
      (such as breathing exercises, grounding techniques, or positive reframing). 
      Always remind the user that your guidance does not replace professional medical or mental health advice, 
      and encourage them to seek support from a trusted person or professional if needed. 
      Keep your answers short, kind, and focused on immediate comfort.
      User symptoms: ${query}`
    );

    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
