import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallBackPage from "./pages/auth-callback/AuthCallBackPage";
import MainLayout from "./layout/MainLayout";
import Chatpage from "./pages/chat/Chatpage";
import AlbumPage from "./pages/album/AlbumPage";
import AudioPlayer from "./layout/components/AudioPlayer";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AudioPlayer />
      <Toaster />
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
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="chat" element={<Chatpage />} />
          <Route path="album/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
