import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

export const LeftSideBar = () => {
  //@ts-ignore
  const { isLoading, fetchAlbums, albums } = useMusicStore();
  useEffect(() => {
    const loadAlbums = async () => {
      await fetchAlbums();
    };
    loadAlbums();
  }, []);

  return (
    <div className="h-full flex flex-col  gap-2">
      <div className="rounded-lg bg-zinc-900 p-4 ">
        <div className="space-y-2">
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
            to={"/"}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline"> Home</span>
          </Link>
          <SignedIn>
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
              to={"/"}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>
      {/* library Section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="item-center flex text-white px-2  ">
            <Library />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]  overflow-y-scroll custom-scrollbar">
          <div className="space-y-2">
            {isLoading ? (
              <PlayListSkeleton />
            ) : (
              albums.map((album, i) => (
                <Link
                  to={`/album/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer "
                >
                  <img
                    src={album.imageUrl}
                    alt="playlist"
                    className="size-12 rounded-md flex-shrink-0 object-cover "
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
