import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Post cannot be empty"
      });
    }

    const post = await Post.create({
      author: req.user._id,
      content: content.trim(),
      images: req.body.images || []
    });

    await post.populate(
      "author",
      "anonymousName"
    );

    res.status(201).json({
      post
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create post"
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "anonymousName")
      .sort({
        createdAt: -1
      });

    res.json({
      posts
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch posts"
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (
      post.author.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only delete your own posts"
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete post"
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      likes: post.likes
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to like post"
    });
  }
};