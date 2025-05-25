import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setIsLoading] = useState(true);
  const { getToken, isLoaded } = useAuth();
  const { getAdminStatus } = useAuthStore();

  useEffect(() => {
    if (!isLoaded) return;

    // Axios interceptor - always use fresh token
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Initial Auth setup
    const initAuth = async () => {
      try {
        await getAdminStatus(); // no need to manually update axios headers
      } catch (error) {
        console.log("error in authprovider", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Eject interceptor on unmount
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken, isLoaded]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="text-emerald-500 size-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
