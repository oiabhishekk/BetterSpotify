import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallBackPage from "./pages/auth-callback/AuthCallBackPage";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />
        }
      />

      <Route path="/auth-callback" element={<AuthCallBackPage />} />
    </Routes>
  );
};

export default App;
