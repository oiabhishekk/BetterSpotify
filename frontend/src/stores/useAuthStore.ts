import axiosInstance from "@/lib/axios";
import { create } from "zustand";
interface UserStore {
  isAdmin:boolean;
  error:any |null;
  reset:()=>void;
  isLoading:boolean;
  getAdminStatus: ()=>Promise<void>;

}

export const useAuthStore = create<UserStore>((set)=>({
  isAdmin:false,
  error:null,
  isLoading:false,
  getAdminStatus:async ()=> {
    set({
      isLoading:true,
      error:null
    })
    try {
      const response=await axiosInstance.get("/admin/check")
      set({
        isAdmin: response.data.admin
      })
      
      
    } catch (error) {
      set({
        error:error
      })
      
    }
    finally{
      set({
        isLoading:false
      })
    }
      
  },
  reset: ()=>{
    set({
      isAdmin:false,
  error:null,
  isLoading:false,
    })
  },

}))