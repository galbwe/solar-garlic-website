import { useEffect, useRef, useState } from "react";

import { AudioDownload } from "@/types";

export default function useAudioPlayer(
  songs: Array<AudioDownload>,
  selectedSongId: string | null,
  onSelectedSongIdChange: (id: string) => void,
) {
  const audioRef = useRef<HTMLAudioElement>(null);
  // Browsers fire "pause" immediately before "ended" when a track finishes
  // naturally, which would otherwise make mirrored-autoplay see isPlaying as
  // false and load the next track paused. This flag lets the "ended" handler
  // force autoplay for that case regardless of the (already-stale) isPlaying.
  const continuePlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);

  const currentIndex = songs.findIndex((song) => song.id === selectedSongId);
  const currentSong = currentIndex >= 0 ? songs[currentIndex] : null;

  function goToRelative(delta: number) {
    if (songs.length === 0) return;
    const nextIndex = (currentIndex + delta + songs.length) % songs.length;
    onSelectedSongIdChange(songs[nextIndex].id);
  }

  // Kept up to date every render so the mount-only listener effect below can
  // always act on the latest songs/currentIndex/callback without needing to
  // re-subscribe (re-subscribing per track change raced with the play() call
  // in the effect above: the "ended"/"play" listeners could be mid
  // teardown-and-reattach at the exact moment a track change synchronously
  // triggered a native "play" event, silently dropping it).
  const latestRef = useRef({ songs, currentIndex, onSelectedSongIdChange });
  useEffect(() => {
    latestRef.current = { songs, currentIndex, onSelectedSongIdChange };
  });

  useEffect(() => {
    const audio = audioRef.current;
    const shouldPlay = isPlaying || continuePlayingRef.current;
    continuePlayingRef.current = false;
    if (!audio || !currentSong) return;
    audio.load();
    if (shouldPlay) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong?.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      const { songs, currentIndex, onSelectedSongIdChange } = latestRef.current;
      if (songs.length === 0) return;
      const nextIndex = (currentIndex + 1 + songs.length) % songs.length;
      if (nextIndex === currentIndex) {
        // Only one song: selecting "the same" id wouldn't trigger a
        // re-render/effect run, so the track-change effect (and its
        // continuePlayingRef flag) would never fire. Loop it directly.
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      continuePlayingRef.current = true;
      onSelectedSongIdChange(songs[nextIndex].id);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
    // Mount-only: re-subscribing per track change is what caused the race
    // described above, so this must not depend on songs/currentIndex.
  }, []);

  return {
    audioRef,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay: () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    },
    seek: (time: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = time;
      setCurrentTime(time);
    },
    restart: () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      setCurrentTime(0);
    },
    next: () => goToRelative(1),
    previous: () => goToRelative(-1),
    setVolume: (v: number) => {
      const audio = audioRef.current;
      if (audio) audio.volume = v;
      setVolumeState(v);
    },
  };
}
