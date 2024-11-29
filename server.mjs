import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import videoRoutes from "./routes/videoRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import playlistRoutes from "./routes/playlistRoutes.mjs";
import historyRoutes from "./routes/historyRoutes.mjs";



dotenv.config();
const app = express();

connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
