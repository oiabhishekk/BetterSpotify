import axiosInstance from "@/lib/axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const AuthCallBackPage = () => {
  const { userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(userId, sessionId, getToken, isSignedIn, user, isLoaded);
  useEffect(() => {
    console.log("jii");

    const syncUserToDB = async () => {
      axiosInstance.post("/auth/callback", {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        imageUrl: user?.imageUrl,
      });
    };
  }, []);
  if (!isLoaded || !user) {
    return <>lofind</>;
  }
  if (isLoaded) {
    return <>{user.firstName}</>;
  }
  return <div>AuthCallBackPage</div>;
};

export default AuthCallBackPage;
