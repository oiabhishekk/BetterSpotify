import axiosInstance from '@/lib/axios';
import type { Album, Song, Stats } from '@/types';
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  currentAlbum:null|Album;
  albums: Album[];
  isLoading: boolean;
  error: any | null;
  madeForYouSongs:Song[];
  featuredSongs:Song[];
  trendingSongs:Song[];
  stats:Stats|null


  fetchAlbums: () => Promise<void>;
  fetchAlbumById:(id:string)=> Promise<void>;
  fetchMadeForYouSongs: ()=>Promise<void>;
  fetchFeaturedSongs: ()=>Promise<void>;
  fetchTrendingSongs: ()=>Promise<void>;
  fetchStats :()=>Promise<void>;

}

export const useMusicStore = create<MusicStore>((set) => ({
  currentAlbum:null,
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
   madeForYouSongs:[],
  featuredSongs:[],
  trendingSongs:[],
  stats:null,
  fetchStats:async() =>{
    set({
      isLoading:true,
      error:null
    })
    try {
      const response= await axiosInstance.get("/stats");
      console.log(response)
      set({
        stats:response.data
      })
    } catch (error) {
      set({ error });
      
    }finally{
      set({ isLoading: false });
    }
  },
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
  fetchMadeForYouSongs: async()=>{
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response =await axiosInstance.get(`/songs/madeforyou`);
      console.log("mfu",response.data)


      set({
        madeForYouSongs:response.data
      })      
      
    } catch (error) {
      set({ error });
      
    }finally{
      set({ isLoading: false });
    }

  },
  fetchFeaturedSongs: async()=>{
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response =await axiosInstance.get(`/songs/featured`);
      console.log("featured", response.data)

      set({
        featuredSongs:response.data
      })      
      
    } catch (error) {
      set({ error });
      
    }finally{
      set({ isLoading: false });
    }

  },
  fetchTrendingSongs: async()=>{
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response =await axiosInstance.get(`/songs/trending`);
      console.log("trending", response.data)


      set({
        trendingSongs:response.data
      })      
      
    } catch (error) {
      set({ error });
      
    }finally{
      set({ isLoading: false });
    }

  },
}));
