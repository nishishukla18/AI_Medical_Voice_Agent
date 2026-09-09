// import { GoogleGenerativeAI } from "@google/generative-ai";
// import Mood from "../models/MoodModel.js";

// export const askMentalHealthAI = async (req, res) => {
//   try {
//     const {
//       query,
//       language = "English",
//     } = req.body;

//     if (!query || !query.trim()) {
//       return res.status(400).json({
//         message: "Message is required",
//       });
//     }

//     const genAI = new GoogleGenerativeAI(
//       process.env.GEMINI_API_KEY
//     );

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });

//     const prompt = `
// You are a warm, compassionate mental health support buddy.

// The user is talking to you as if they are having a real conversation with a supportive human.

// Reply in ${language}.

// IMPORTANT SPEAKING STYLE:
// - Write exactly like a caring human would speak.
// - Sound warm, natural, calm and conversational.
// - Use simple everyday language.
// - Use contractions where natural, such as "I'm", "you're", "it's", "don't", "that's".
// - Avoid robotic, formal or clinical language.
// - Avoid long paragraphs.
// - Keep responses short enough to be comfortably spoken aloud.
// - Prefer 2-5 short sentences.
// - Do not use markdown, bullet points, headings or emojis in the reply.
// - Do not sound like an AI assistant.
// - Do not repeatedly say "I understand how you feel".
// - Don't give unnecessary advice.
// - When appropriate, ask one gentle follow-up question.
// - Use natural conversational phrases such as:
//   "That sounds really difficult."
//   "I'm glad you told me."
//   "It's okay to feel that way."
//   "Take a slow breath for a moment."
//   "You don't have to figure everything out right now."

// Your responsibilities:
// 1. Respond with empathy and emotional support.
// 2. Give simple grounding or coping suggestions when appropriate.
// 3. Never diagnose a mental illness or medical condition.
// 4. Never claim to be a doctor or therapist.
// 5. Keep the response relatively short.
// 6. If the user appears to be in immediate danger or talks about self-harm,
//    encourage them to contact emergency services or a trusted person immediately.

// You must also analyze the emotional tone of the user's message.

// Return ONLY valid JSON in exactly this format:

// {
//   "reply": "your natural conversational response",
//   "mood": "one of: happy, calm, sad, angry, anxious, stressed, lonely, confused, neutral, mixed",
//   "confidence": 0.0,
//   "intensity": 1,
//   "emotions": ["emotion1", "emotion2"]
// }

// Rules for mood analysis:
// - mood is an emotional-state estimate, NOT a medical diagnosis.
// - confidence must be between 0 and 1.
// - intensity must be between 1 and 10.
// - emotions should contain 1 to 3 short emotional descriptions.
// - Do not infer medical disorders.
// - If the message does not provide enough emotional information, use "neutral".

// User message:
// ${query}
// `;

//     const result = await model.generateContent(prompt);

//     const rawResponse = result.response.text();

//     let aiData;

//     try {
//       const cleanedResponse = rawResponse
//         .replace(/```json/gi, "")
//         .replace(/```/g, "")
//         .trim();

//       aiData = JSON.parse(cleanedResponse);

//     } catch (error) {
//       console.error(
//         "Invalid Gemini JSON:",
//         rawResponse
//       );

//       return res.status(500).json({
//         message: "AI returned an invalid response",
//       });
//     }

//     // Save mood analysis
//     const mood = await Mood.create({
//       user: req.user._id,
//       message: query,
//       mood: aiData.mood,
//       confidence: aiData.confidence,
//       intensity: aiData.intensity,
//       emotions: aiData.emotions,
//     });

//     res.json({
//       reply: aiData.reply,

//       mood: {
//         id: mood._id,
//         mood: mood.mood,
//         confidence: mood.confidence,
//         intensity: mood.intensity,
//         emotions: mood.emotions,
//         createdAt: mood.createdAt,
//       },
//     });

//   } catch (error) {
//     console.error(
//       "ASK AI ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to communicate with AI",
//     });
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import Mood from "../models/MoodModel.js";

// Gemini clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ttsAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const pcmToWav = (pcmBuffer, sampleRate = 24000) => {
  const numChannels = 1;
  const bitsPerSample = 16;

  const byteRate =
    sampleRate * numChannels * (bitsPerSample / 8);

  const blockAlign =
    numChannels * (bitsPerSample / 8);

  const buffer = Buffer.alloc(44 + pcmBuffer.length);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + pcmBuffer.length, 4);
  buffer.write("WAVE", 8);

  // fmt chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(pcmBuffer.length, 40);

  pcmBuffer.copy(buffer, 44);

  return buffer;
};

// =====================================================
// MAIN AI CONTROLLER
// =====================================================

export const askMentalHealthAI = async (req, res) => {
  try {

    const {
      query,
      language = "auto",
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // =================================================
    // 1. GEMINI TEXT RESPONSE
    // =================================================

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });


    const prompt = `
You are a warm, compassionate mental health support buddy.

The user is talking to you as if they are having a real conversation with a supportive human.

Reply in ${language}.

IMPORTANT SPEAKING STYLE:

- Write exactly like a caring human would speak.
- Sound warm, natural, calm and conversational.
- Use simple everyday language.
- Use contractions where natural.
- Avoid robotic, formal or clinical language.
- Avoid long paragraphs.
- Keep responses short enough to be comfortably spoken aloud.
- Prefer 2-5 short sentences.
- Do not use markdown.
- Do not use bullet points.
- Do not use headings.
- Do not use emojis.
- Do not sound like an AI assistant.
- Do not repeatedly say "I understand how you feel".
- Don't give unnecessary advice.
- When appropriate, ask one gentle follow-up question.

Your responsibilities:

1. Respond with empathy and emotional support.
2. Give simple grounding or coping suggestions when appropriate.
3. Never diagnose a mental illness or medical condition.
4. Never claim to be a doctor or therapist.
5. Keep the response relatively short.
6. If the user appears to be in immediate danger or talks about self-harm,
   encourage them to contact emergency services or a trusted person immediately.

You must also analyze the emotional tone of the user's message.

Return ONLY valid JSON:

{
  "reply": "your natural conversational response",
  "mood": "one of: happy, calm, sad, angry, anxious, stressed, lonely, confused, neutral, mixed",
  "confidence": 0.0,
  "intensity": 1,
  "emotions": ["emotion1", "emotion2"]
}

Rules:
LANGUAGE RULE:
Reply in ${language}.
Detect the language used by the user.

If the user speaks/writes Hindi, reply naturally in Hindi.

If the user speaks/writes English, reply naturally in English.

If the user mixes Hindi and English, you may naturally use Hinglish.

Do not translate a Hindi message into English.

Do not translate an English message into Hindi.

The response language should match the user's language.
- mood is an emotional-state estimate, NOT a medical diagnosis.
- confidence must be between 0 and 1.
- intensity must be between 1 and 10.
- emotions should contain 1 to 3 short emotional descriptions.
- Do not infer medical disorders.
- If there is not enough emotional information, use "neutral".

User message:

${query}
`;

    const result = await model.generateContent(prompt);

    const rawResponse = result.response.text();


    // =================================================
    // 2. PARSE GEMINI RESPONSE
    // =================================================

    let aiData;

    try {

      const cleanedResponse = rawResponse
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      aiData = JSON.parse(cleanedResponse);

    } catch (error) {

      console.error(
        "Invalid Gemini JSON:",
        rawResponse
      );

      return res.status(500).json({
        message: "AI returned an invalid response",
      });

    }


    // =================================================
    // 3. SAVE MOOD
    // =================================================

    const mood = await Mood.create({

      user: req.user._id,

      message: query,

      mood: aiData.mood,

      confidence: aiData.confidence,

      intensity: aiData.intensity,

      emotions: aiData.emotions,

    });

    // =================================================
    // 4. GEMINI TTS
    // =================================================

    let audioBase64 = null;

    try {

      const ttsResponse =
        await ttsAI.models.generateContent({

          model:
            "gemini-2.5-flash-preview-tts",

          contents: [
            {
              parts: [
                {
                  text: `
Speak naturally and warmly, like a caring friend.

Tone:
warm, calm, gentle, empathetic and reassuring.

Pacing:
natural conversational pacing with small pauses.

Do not sound like a narrator,
robot, announcer or customer-service agent.

Speak the following response naturally:

${aiData.reply}
                  `,
                },
              ],
            },
          ],

          config: {

            responseModalities: ["AUDIO"],

            speechConfig: {

              voiceConfig: {

                prebuiltVoiceConfig: {
                  voiceName:
                    "Kore",
                },

              },

            },

          },

        });


      // Find audio part
      const audioPart =
        ttsResponse.candidates?.[0]
          ?.content?.parts
          ?.find(
            (part) => part.inlineData
          );


      if (!audioPart?.inlineData?.data) {

        throw new Error(
          "Gemini TTS returned no audio"
        );

      }


      // Gemini returns base64 PCM
      const pcmBuffer = Buffer.from(
        audioPart.inlineData.data,
        "base64"
      );


      // Convert PCM -> WAV
      const wavBuffer = pcmToWav(
        pcmBuffer,
        24000
      );


      audioBase64 =
        wavBuffer.toString("base64");


    } catch (ttsError) {

      // Don't fail the entire AI response
      // if TTS fails.

      console.error(
        "GEMINI TTS ERROR:",
        ttsError
      );

    }


    // =================================================
    // 5. SEND RESPONSE
    // =================================================

    return res.json({

      reply: aiData.reply,

      audio: audioBase64
        ? {
            data: audioBase64,
            type: "audio/wav",
          }
        : null,

      mood: {

        id: mood._id,

        mood: mood.mood,

        confidence: mood.confidence,

        intensity: mood.intensity,

        emotions: mood.emotions,

        createdAt: mood.createdAt,

      },

    });


  } catch (error) {

    console.error(
      "ASK AI ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to communicate with AI",
    });

  }
};