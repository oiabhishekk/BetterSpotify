import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs: Song[]|null) => {
    if(!songs){
      return
    }
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs: Song[] | null, startIndex = 0) => {
    if (!songs ||songs.length === 0  ) return;
    set({
      queue: songs,
      currentSong: songs[startIndex],
      currentIndex: startIndex,
      isPlaying: true,
    });
    console.log(get().currentSong)

  },

  setCurrentSong: (song) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id); 
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    set({
      isPlaying: !get().isPlaying,
    });
  },

  playNext: () => {
    const { queue, currentIndex, setCurrentSong } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      setCurrentSong(queue[nextIndex]);
    } else {
      set({ isPlaying: false });
    }
  },

  playPrevious: () => {
    const { queue, currentIndex, setCurrentSong } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentSong(queue[prevIndex]);
    } else {
      set({ isPlaying: false });
    }
  },
}));
