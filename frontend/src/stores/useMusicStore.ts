import axiosInstance from '@/lib/axios';
import type { Album, Song, Stats } from '@/types';
import { create } from "zustand";
import toast from "react-hot-toast";

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
  deleteSong:(id:String)=>Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteAlbum:(id:string)=>Promise<void>;

}

export const useMusicStore = create<MusicStore>((set,get) => ({
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
      // isLoading:true,
      // error:null
    })
    try {
      const response= await axiosInstance.get("/stats");
      set({
        stats:response.data
      })
    } catch (error) {
      set({ error });
      
    }finally{
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id) => {
  set({ isLoading: true, error: null });
  try {
    await axiosInstance.delete(`admin/album/${id}`);
    await get().fetchStats()

    // Optimistically update local state
    const prevAlbums = get().albums;
    const updatedAlbums = prevAlbums.filter((album) => album._id !== id);
    set({ albums: updatedAlbums });

    toast.success("Album deleted successfully");
  } catch (error: any) {
    console.error("Error in delete album", error);
    toast.error(error?.response?.data?.message || "Error deleting album");
  } finally {
    set({ isLoading: false });
  }
},

  fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
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
  deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);
      
      await get().fetchStats()

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
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
