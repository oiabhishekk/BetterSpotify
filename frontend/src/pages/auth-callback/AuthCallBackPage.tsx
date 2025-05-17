import axiosInstance from "@/lib/axios";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  useEffect(() => {
    const syncUserToDB = async () => {
      try {
        await axiosInstance.post("/auth/callback", {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
        });
      } catch {
        console.log("Error while signIn");
        await signOut();
        // signout somehow
      } finally {
        navigate("/");
      }
    };
    syncUserToDB();
  }, [isLoaded, navigate, user]);
  if (!isLoaded || !user) {
    return <>lofind</>;
  }
  if (isLoaded) {
    return <>{user.firstName}</>;
  }
  return <div>AuthCallBackPage</div>;
};

export default AuthCallBackPage;
