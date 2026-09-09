import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    mood: {
      type: String,
      required: true,
      enum: [
        "happy",
        "calm",
        "sad",
        "angry",
        "anxious",
        "stressed",
        "lonely",
        "confused",
        "neutral",
        "mixed",
      ],
    },

    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },

    intensity: {
      type: Number,
      min: 1,
      max: 10,
    },

    emotions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;