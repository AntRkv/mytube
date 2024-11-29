import express from "express";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Добавление комментария
router.post("/:videoId", authMiddleware, addComment);

// Получение комментариев к видео
router.get("/:videoId", getComments);

// Удаление комментария
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
