import History from "../models/historyModel.mjs";

// Добавление видео в историю
export const addToHistory = async (req, res) => {
  try {
    const existingHistory = await History.findOne({
      user: req.user.id,
      video: req.params.videoId,
    });

    if (!existingHistory) {
      await History.create({ user: req.user.id, video: req.params.videoId });
    }

    res.status(201).json({ message: "Added to history" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение истории просмотров
export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id }).populate(
      "video",
      "title"
    );
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Очистка истории просмотров
export const clearHistory = async (req, res) => {
  try {
    await History.deleteMany({ user: req.user.id });
    res.status(200).json({ message: "History cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
