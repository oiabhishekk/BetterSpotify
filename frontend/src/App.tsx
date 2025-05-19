import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallBackPage from "./pages/auth-callback/AuthCallBackPage";
import MainLayout from "./layout/MainLayout";
import Chatpage from "./pages/Chatpage";

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
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="chat" element={<Chatpage />} />
      </Route>
    </Routes>
  );
};

export default App;
