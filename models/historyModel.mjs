import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Пользователь
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }, // Видео
  watchedAt: { type: Date, default: Date.now }, // Время просмотра
});

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);
export default WatchHistory;
