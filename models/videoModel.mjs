import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true }, // URL или путь к видео
  thumbnail: { type: String, required: true }, // URL для обложки
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ссылка на пользователя
  views: { type: Number, default: 0 },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] }, // Лайки от пользователей
  createdAt: { type: Date, default: Date.now },
  tags: { type: [String], default: [] }, // Теги для видео
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
