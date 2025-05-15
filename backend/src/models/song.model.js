import { model, Schema, Types } from "mongoose";

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    albumId: {
      type: Types.ObjectId,
      ref: "Album",
      required: false,
    },
  },
  { timestamps: true }
);
export const Song = model("Song", songSchema);
