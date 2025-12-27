import sql from "../configs/db.js";

export const getMoodAnalytics = async (req, res) => {
  try {
    const data = await sql`
      SELECT
        emotion,
        mood_score,
        summary,
        created_at
      FROM mood_analytics
      ORDER BY created_at DESC
    `;

    res.json(data);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
