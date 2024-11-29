import Video from "../models/videoModel.mjs";

// Загрузка видео
export const uploadVideo = async (req, res) => {
  const { title, description, url, thumbnail, tags } = req.body;

  try {
    const video = await Video.create({
      title,
      description,
      url,
      thumbnail,
      tags,
      owner: req.user.id,
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение всех видео
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("owner", "username");
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение видео по ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "owner",
      "username"
    );
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Лайк видео
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.likes.includes(req.user.id)) {
      video.likes = video.likes.filter(
        (like) => like.toString() !== req.user.id
      );
    } else {
      video.likes.push(req.user.id);
    }

    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
