import express from "express";
import {
  addToHistory,
  getHistory,
  clearHistory,
} from "../controllers/historyController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Добавление видео в историю
router.post("/:videoId", authMiddleware, addToHistory);

// Получение истории просмотров
router.get("/", authMiddleware, getHistory);

// Очистка истории просмотров
router.delete("/", authMiddleware, clearHistory);

export default router;
