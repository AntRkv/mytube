import express from "express";
import {
  createPlaylist,
  getPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
} from "../controllers/playlistController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Создание нового плейлиста
router.post("/", authMiddleware, createPlaylist);

// Получение всех плейлистов пользователя
router.get("/", authMiddleware, getPlaylists);

// Добавление видео в плейлист
router.post("/:playlistId/videos", authMiddleware, addVideoToPlaylist);

// Удаление видео из плейлиста
router.delete("/:playlistId/videos/:videoId", authMiddleware, removeVideoFromPlaylist);

// Удаление плейлиста
router.delete("/:playlistId", authMiddleware, deletePlaylist);

export default router;
