import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const AuthCallBackPage = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  useEffect(() => {
    const syncUserToDB = async () => {
      if (!isLoaded || !user) {
        return <></>;
      }
      try {
        await axiosInstance.post("/auth/callback", {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
        });
      } catch (error) {
        console.log("Error while signIn", error);
        // await signOut();
        // signout somehow
      } finally {
        navigate("/");
      }
    };
    syncUserToDB();
  }, [isLoaded, navigate, user]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">logging you in</h3>
          <p className="text-zinc-400 text-sm">redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallBackPage;
