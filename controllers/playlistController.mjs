import Playlist from "../models/playlistModel.mjs";

// Создание нового плейлиста
export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.create({
      name,
      user: req.user.id,
      videos: [],
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение всех плейлистов пользователя
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).populate(
      "videos",
      "title"
    );
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Добавление видео в плейлист
export const addVideoToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { videoId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    if (!playlist.videos.includes(videoId)) {
      playlist.videos.push(videoId);
      await playlist.save();
    }

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление видео из плейлиста
export const removeVideoFromPlaylist = async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    playlist.videos = playlist.videos.filter((id) => id.toString() !== videoId);
    await playlist.save();

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление плейлиста
export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
