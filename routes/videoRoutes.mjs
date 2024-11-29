import express from "express";
import {
  uploadVideo,
  getVideos,
  getVideoById,
  likeVideo,
} from "../controllers/videoController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Загрузка нового видео
router.post("/upload", authMiddleware, uploadVideo);

// Получение всех видео
router.get("/", getVideos);

// Получение видео по ID
router.get("/:id", getVideoById);

// Лайк видео
router.post("/:id/like", authMiddleware, likeVideo);

export default router;
