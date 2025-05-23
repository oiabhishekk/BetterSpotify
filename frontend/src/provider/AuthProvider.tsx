import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setIsLoading] = useState(true);
  const { getToken } = useAuth();
  const { getAdminStatus } = useAuthStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        getAdminStatus();
      } catch (error) {
        updateApiToken(null);
        console.log("error in authprovider", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [getToken]);
  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center ">
        <Loader className="text-emerald-500 size-8 animate-spin" />
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;

// using interceptor in axios

// import React, { useEffect, useState } from "react";
// import { Loader } from "lucide-react";
// import { useAuth } from "@clerk/clerk-react";
// import axiosInstance from "@/lib/axios";

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [loading, setIsLoading] = useState(true);
//   const { getToken } = useAuth();

//   useEffect(() => {
//     // Add Axios request interceptor
//     const interceptor = axiosInstance.interceptors.request.use(
//       async (config) => {
//         const token = await getToken();
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     // Auth initialization
//     const initAuth = async () => {
//       try {
//         await getToken(); // optional prefetch to warm up
//       } catch (error) {
//         console.log("error in authprovider", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initAuth();

//     // Cleanup interceptor on unmount
//     return () => {
//       axiosInstance.interceptors.request.eject(interceptor);
//     };
//   }, [getToken]);

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <Loader className="text-emerald-500 size-8 animate-spin" />
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default AuthProvider;
