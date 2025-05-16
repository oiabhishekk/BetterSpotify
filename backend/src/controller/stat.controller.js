import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "./../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    const { totalSong, totalAlbum, totalUser, uniqueArtist } =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.aggregate([
          {
            $group: {
              _id: "$artist", // Group by artist name
            },
          },
          {
            $count: "uniqueArtistCount", // Count number of unique artist groups
          },
        ]),
      ]);

    // uniqueArtist = [ { uniqueArtistCount: 3 } ]
    uniqueArtist = uniqueArtist[0]?.uniqueArtistCount || 0;

    res.status(200).json({ totalSong, totalAlbum, totalUser, uniqueArtist });
  } catch (error) {
    next(error);
  }
};
