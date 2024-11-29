import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Регистрация пользователя
router.post("/register", registerUser);

// Авторизация пользователя
router.post("/login", loginUser);

// Получение профиля (требуется авторизация)
router.get("/profile", authMiddleware, getUserProfile);

// Удаление пользователя
router.delete("/:id", authMiddleware, deleteUser);

// Получение пользователя по ID
router.get("/:id", authMiddleware, getUserById);

// Обновление данных пользователя
router.put("/:id", authMiddleware, updateUser);

export default router;
