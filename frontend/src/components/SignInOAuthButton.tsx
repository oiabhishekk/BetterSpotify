import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
const SignInOAuthButton = () => {
  const { isLoaded, signIn } = useSignIn();
  if (!isLoaded) {
    // Handle loading state
    return null;
  }
  const signInWithGoogle = async () => {
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };
  return (
    <Button
      variant={"secondary"}
      className="w-full text-white h-11 border-zinc-200"
      onClick={signInWithGoogle}
    >
      continue with google
    </Button>
  );
  return <div>SignInOAuthButton</div>;
};

export default SignInOAuthButton;
