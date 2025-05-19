export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: string[];      // Array of song IDs as strings
  __v: number;
  createdAt: string;    // ISO date string
  updatedAt: string;    // ISO date string
}
export interface Song {
  _id: string;
  title: string;
  imageUrl: string;
  artist: string;
  audioUrl: string;
  duration: number;
  __v: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  albumId: string;
}
