import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Владелец плейлиста
  videos: { type: [mongoose.Schema.Types.ObjectId], ref: "Video", default: [] }, // Видео в плейлисте
  createdAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
