import axiosInstance from '@/lib/axios';
import type { Album } from '@/types';
import { create } from "zustand";

interface MusicStore {
  songs: any[];
  albums: Album[];
  isLoading: boolean;
  error: any | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    })

    try {
      const response = await axiosInstance.get("/albums");
      console.log(response.data)
      set({ albums: response.data.albums });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
