import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import SignInOAuthButton from "./SignInOAuthButton";

const TopBar = () => {
  return (
    <div className="flex items-center">
      TopBar
      <SignedIn>{<SignOutButton />}</SignedIn>
      <SignedOut>
        <SignInOAuthButton />
      </SignedOut>
    </div>
  );
};

export default TopBar;
