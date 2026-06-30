"use client";

import downloadIcon from "../../../public/download-icon.svg";
import spotifyIcon from "../../../public/spotify.svg";
import { AUDIO_DOWNLOADS } from "@/constants";

import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

import { AudioDownload } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { teko } from "@/fonts";

export default function DownloadsPage() {
  const download = AUDIO_DOWNLOADS[0];
  const tracks = [
    {
      url: getDownloadUrl(download),
      title: download.title,
      tags: [],
    },
  ];

  return (
    <section className="h-screen max-h-screen flex flex-col items-center gap-2">
      <h1 className={`${teko.className} text-5xl xl:text-7xl text-yellow`}>
        Music
      </h1>
      <div className="w-4/5 flex flex-col items-center gap-2 mt-20">
        <Player
          trackList={tracks}
          includeTags={false}
          includeSearch={false}
          showPlaylist={false}
          sortTracks={false}
          autoPlayNextTrack={false}
          customColorScheme={{
            playerBackground: "#200932",
            titleColor: "#ffcb2e",
            progressSlider: "#ffcb2e",
            bufferLoaded: "#431E61",
            progressLeft: "#0D0216",
            volumeSlider: "#ffcb2e",
            volumeLeft: "#431E61",
          }}
        />
        <div className="flex flex-row gap-4">
          <Link download href={getDownloadUrl(download)}>
            <button className="hover:cursor-pointer">
              <Image width={60} height={60} src={downloadIcon} alt="Download" />
            </button>
          </Link>
          <a href={download.spotify} target="_blank" rel="noopener noreferrer">
            <Image
              src={spotifyIcon}
              alt="Spotify icon"
              width={60}
              height={60}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function getDownloadUrl(download: AudioDownload): string {
  const rootPath = "/audio";
  return `${rootPath}/${download.file}`;
}
