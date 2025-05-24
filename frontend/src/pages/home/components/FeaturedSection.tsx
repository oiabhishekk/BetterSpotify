import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
import { usePlayerStore } from "@/stores/usePlayerStore";

const FeaturedSection = () => {
  const { playAlbum, togglePlay, currentSong } = usePlayerStore();
  const { isLoading, featuredSongs, error } = useMusicStore();
  if (isLoading) return <FeaturedGridSkeleton />;
  const handlePlayAlbum = (index = 0) => {
    console.log(index);
    const selectedSong = featuredSongs[index];
    console.log(selectedSong);
    console.log(currentSong?.audioUrl === selectedSong?.audioUrl);

    // If user clicks the same song
    if (currentSong?.audioUrl === selectedSong?.audioUrl) {
      togglePlay();
      return;
    }

    // If different song, start album from that index
    console.log(featuredSongs);

    if (featuredSongs.length) {
      console.log(featuredSongs);
      playAlbum(featuredSongs, index);
    }
  };

  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song, index) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
          <div
            onClick={() => {
              handlePlayAlbum(index);
            }}
          >
            <PlayButton song={song} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default FeaturedSection;
