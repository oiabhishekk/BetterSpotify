import { usePlayerStore } from "@/stores/usePlayerStore";
import  { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, playNext, isPlaying } = usePlayerStore();

  //to handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const isSongChange = prevSongRef.current !== currentSong.audioUrl;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio play error:", error);
      }
    };

    if (isSongChange) {
      // Pause current song before switching
      audio.pause();
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;

      if (isPlaying) {
        // Wait for src to be ready before playing
        playAudio();
      }
    } else {
      // Same song, just play/pause based on state
      if (isPlaying) {
        playAudio();
      } else {
        audio.pause();
      }
    }
  }, [currentSong, isPlaying]);

  const handleEnded = () => {
    playNext();
  };

  return <audio onEnded={handleEnded} ref={audioRef} />;
};

export default AudioPlayer;
