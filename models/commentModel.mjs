import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }, // Ссылка на видео
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ссылка на пользователя
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
