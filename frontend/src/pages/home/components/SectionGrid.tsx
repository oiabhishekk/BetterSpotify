import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";
import type { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { usePlayerStore } from "@/stores/usePlayerStore";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
  const { playAlbum, currentSong, togglePlay } = usePlayerStore();

  if (isLoading) return <SectionGridSkeleton />;
  const handlePlayAlbum = (index = 0, url: string) => {
    console.log(index);
    console.log(currentSong?.audioUrl === url);

    // If user clicks the same song
    if (currentSong?.audioUrl === url) {
      togglePlay();
      return;
    }

    // If different song, start album from that index
    console.log(songs);

    if (songs.length) {
      console.log(songs);
      playAlbum(songs, index);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Show all
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song, i) => (
          <div
            onClick={() => {
              handlePlayAlbum(i, song.audioUrl);
            }}
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105"
                />
              </div>
              <PlayButton song={song} />
            </div>
            <h3 className="font-medium mb-2 truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SectionGrid;
