import Mood from "../models/MoodModel.js";

export const getMyMoods = async (req, res) => {
  try {
    const moods = await Mood.find({
      user: req.user._id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(50)
      .select(
        "mood confidence intensity emotions createdAt"
      );

    res.json({
      moods,
    });

  } catch (error) {
    console.error(
      "GET MOODS ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch mood history",
    });
  }
};