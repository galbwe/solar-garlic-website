"use client";

/* eslint-disable react-hooks/refs -- useAudioPlayer only reads audioRef.current inside
   effects/handlers, never during render, but this rule taints every property of a hook's
   return value as ref-unsafe once the hook touches a ref anywhere internally. */

import Image from "next/image";
import Link from "next/link";

import useAudioPlayer from "@/hooks/useAudioPlayer";
import { AudioDownload } from "@/types";
import downloadIcon from "../../../public/download-icon.svg";
import spotifyIcon from "../../../public/spotify.svg";
import styles from "./AudioPlayer.module.css";

interface Props {
  songs: Array<AudioDownload>;
  selectedSongId: string | null;
  onSelectedSongIdChange: (id: string) => void;
}

export default function AudioPlayer({
  songs,
  selectedSongId,
  onSelectedSongIdChange,
}: Props) {
  const player = useAudioPlayer(songs, selectedSongId, onSelectedSongIdChange);
  const { currentSong } = player;

  return (
    <div className="flex flex-col bg-purple p-8 rounded-sm items-center gap-4 w-11/12 xl:w-4/5 mt-4 xl:mt-0 max-w-xl">
      <audio
        ref={player.audioRef}
        src={currentSong ? getDownloadUrl(currentSong) : undefined}
        preload="metadata"
        className="hidden"
      />

      <div className="flex flex-row items-center gap-4 w-full">
        <span className="text-yellow text-sm w-10 text-right">
          {formatTime(player.currentTime)}
        </span>
        <input
          type="range"
          aria-label="Progress"
          className={styles.slider}
          min={0}
          max={player.duration || 0}
          step={0.1}
          value={player.currentTime}
          onChange={(e) => player.seek(Number(e.target.value))}
        />
        <span className="text-yellow text-sm w-10">
          {formatTime(player.duration)}
        </span>
      </div>

      <div className="flex flex-row items-center gap-6">
        <button aria-label="Previous" onClick={player.previous}>
          <span className="text-yellow text-4xl">⏮</span>
        </button>
        <button aria-label="Restart" onClick={player.restart}>
          <span className="text-yellow text-4xl">↺</span>
        </button>
        <button
          aria-label={player.isPlaying ? "Pause" : "Play"}
          onClick={player.togglePlay}
        >
          <span className="text-yellow text-4xl">
            {player.isPlaying ? "⏸" : "▶"}
          </span>
        </button>
        <button aria-label="Next" onClick={player.next}>
          <span className="text-yellow text-4xl">⏭</span>
        </button>
      </div>

      <div className="flex flex-row items-center gap-2 w-40">
        <span className="text-yellow text-lg">Volume</span>
        <input
          type="range"
          aria-label="Volume"
          className={styles.slider}
          min={0}
          max={1}
          step={0.01}
          value={player.volume}
          onChange={(e) => player.setVolume(Number(e.target.value))}
        />
      </div>

      {currentSong && (
        <div className="flex flex-row gap-4">
          <Link
            download
            href={getDownloadUrl(currentSong)}
            className="flex flex-col items-center"
          >
            <Image width={30} height={30} src={downloadIcon} alt="Download" />
            <span className="text-yellow text-xs">Download</span>
          </Link>
          {currentSong.spotify && (
            <a
              href={currentSong.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <Image
                src={spotifyIcon}
                alt="Spotify icon"
                width={30}
                height={30}
              />
              <span className="text-yellow text-xs">Spotify</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function getDownloadUrl(song: AudioDownload): string {
  return `/audio/${song.file}`;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}
