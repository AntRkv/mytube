import Comment from "../models/commentModel.mjs";

// Добавление комментария
export const addComment = async (req, res) => {
  const { content } = req.body;

  try {
    const comment = await Comment.create({
      content,
      video: req.params.videoId,
      user: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение комментариев для видео
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).populate(
      "user",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление комментария
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
