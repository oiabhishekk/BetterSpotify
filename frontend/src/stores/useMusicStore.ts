import axiosInstance from '@/lib/axios';
import type { Album, Song } from '@/types';
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  currentAlbum:null|Album;
  albums: Album[];
  isLoading: boolean;
  error: any | null;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById:(id:string)=> Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  currentAlbum:null,
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbumById: async (id:string)=>{
    set({
      isLoading: true,
      error: null,
    })
    try {
      const response =await axiosInstance.get(`/albums/${id}`);
      set({
        currentAlbum:response.data
      })      
      
    } catch (error) {
      set({ error });
      
    }finally{
      set({ isLoading: false });
    }


  },
  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    })

    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data.albums });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
