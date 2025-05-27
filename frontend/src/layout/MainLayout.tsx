import { Outlet } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { LeftSideBar } from "./components/LeftSideBar";
import FriendsActivity from "./components/FriendsActivity";
import { PlaybackControls } from "./components/PlayBackControls";
import { useIsMobile } from "@/lib/utils";

const MainLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-2">
      <ResizablePanelGroup
        className="flex-1 flex h-full"
        direction="horizontal"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 20 : 20}
          maxSize={30}
          className=""
        >
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors " />

        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors " />

        <ResizablePanel
          minSize={0}
          maxSize={25}
          defaultSize={20}
          className={`${isMobile ? "hidden" : "block"}`}
        >
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlaybackControls />
    </div>
  );
};

export default MainLayout;
