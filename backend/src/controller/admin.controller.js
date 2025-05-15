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
    // save to cloudinary
    const audioUrl = uploadToClaudinary(audioFile);
    const imageUrl = uploadToClaudinary(imageFile);
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
