import { model, Schema, Types } from "mongoose";

const albumSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    songs: [{ type: Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);
export const Album = model("Album", albumSchema);
