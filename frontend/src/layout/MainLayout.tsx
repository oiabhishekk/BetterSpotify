import React from "react";
import { Outlet } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { LeftSideBar } from "./components/LeftSideBar";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div>
      <ResizablePanelGroup
        className="flex-1 flex h-full"
        direction="horizontal"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 20}
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

        <ResizablePanel minSize={0} maxSize={25} defaultSize={20} className="">
          {" "}
          two{" "}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
