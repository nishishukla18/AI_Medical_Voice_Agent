import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user._id,
      content: content.trim(),
    });

    await Post.findByIdAndUpdate(req.params.postId, {
      $inc: {
        commentsCount: 1,
      },
    });

    await comment.populate("author", "anonymousName");

    res.status(201).json({
      comment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create comment",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("author", "anonymousName")
      .sort({
        createdAt: 1,
      });

    res.json({
      comments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};
