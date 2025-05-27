import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import SignInOAuthButton from "./SignInOAuthButton";
import { Link } from "react-router-dom";
import { LayoutDashboardIcon } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useIsMobile } from "@/lib/utils";

const TopBar = () => {
  const { isAdmin } = useAuthStore();
  const isMobile = useIsMobile();
  return (
    <div
      className="rounded-md flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    "
    >
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"} className="flex items-center ">
            <LayoutDashboardIcon className="size-4  mr-2" />
            {isMobile ? "Admin" : "Admin Dashboard"}
          </Link>
        )}

        <SignedIn>{isMobile ? "" : <SignOutButton />}</SignedIn>
        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
