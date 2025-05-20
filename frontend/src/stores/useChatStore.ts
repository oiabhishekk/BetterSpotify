import axiosInstance from "@/lib/axios";
import type { User } from "@/types";
import { create } from "zustand";

interface ChatStore{
  users:User[];
  fetchUsers:()=>Promise<void>;
  isLoading:boolean;
  error:any|null
}
export const useChatStore = create<ChatStore>((set)=>({
  users:[],
  isLoading:false,
  error:null,
  fetchUsers :async ()=>{
    set({
      isLoading:true,
      error:null,
    })
try {
  const response =  await axiosInstance.get(`/users`) 
  console.log(response.data)
  set({
    users:response.data,
  })
} catch (error) {
  set({
    error
  })

  
}finally{
  set({
    isLoading:false
  })
}
  }
}))