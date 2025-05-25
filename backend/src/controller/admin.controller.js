import { Song } from "./../models/song.model.js";
import { Album } from "./../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";
const uploadToClaudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("error while uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      res.status(400).json({ message: "please upload all the files" });
      return;
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    console.log(title, artist, albumId, duration);
    // save to cloudinary
    const audioUrl = await uploadToClaudinary(audioFile);
    const imageUrl = await uploadToClaudinary(imageFile);
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();
    if (song.albumId) {
      const album = await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json({ song });
  } catch (error) {
    next(error);
  }
};
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (song?.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;
    const imageUrl = await uploadToClaudinary(imageFile);
    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    await album.save();
    res.status(201).json({ message: "album added successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "ALbum deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
