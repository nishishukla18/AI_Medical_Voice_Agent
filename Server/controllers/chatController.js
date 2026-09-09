import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate(
        "sender",
        "anonymousName"
      )
      .sort({
        createdAt: 1,
      })
      .limit(100);

    res.status(200).json({
      messages,
    });

  } catch (error) {
    console.error(
      "GET CHAT MESSAGES ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};