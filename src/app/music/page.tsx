"use client";

import { useState } from "react";
import { format } from "date-fns";

import { AUDIO_DOWNLOADS } from "@/constants";
import Accordion from "@/components/Accordion";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import useBreakpoint from "@/hooks/useBreakpoint";
import { teko } from "@/fonts";

import { AccordionGroup, AccordionOption, AudioDownload } from "@/types";

const SONGS_GROUP_ID = "songs";

export default function MusicPage() {
  const { isBreakpointOrAbove, isBreakpointOrBelow } = useBreakpoint();
  const songs = AUDIO_DOWNLOADS ?? [];
  const defaultSong = songs.length > 0 ? songs[0] : null;

  const [selectedSongId, setSelectedSongId] = useState<string | null>(
    defaultSong?.id ?? null,
  );
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    SONGS_GROUP_ID,
  );

  const handleGroupClick = (group: AccordionGroup<null, AudioDownload>) => {
    setSelectedGroupId((prev) => (prev === group.id ? null : group.id));
  };
  const handleOptionClick = (option: AccordionOption<AudioDownload>) => {
    setSelectedSongId(option.id);
  };

  const songsGroup: AccordionGroup<null, AudioDownload> = {
    id: SONGS_GROUP_ID,
    title: "Songs",
    subtext: "",
    options: songs.map(getAccordionOption),
  };

  return (
    <section className="h-screen max-h-screen flex flex-col items-center">
      <div className="flex flex-row h-screen max-h-screen w-screen">
        {isBreakpointOrAbove("xl") && (
          <Accordion
            groups={[songsGroup]}
            selectedGroupId={selectedGroupId}
            selectedOptionId={selectedSongId}
            onGroupClick={handleGroupClick}
            onOptionClick={handleOptionClick}
          />
        )}
        <div
          className={`
                    w-full
                    flex
                    flex-col
                    justify-start
                    items-center
                    gap-4
                    xl:gap-0
                `}
        >
          <h1
            className={`${teko.className} hidden xl:flex xl:text-7xl py-5 text-yellow`}
          >
            Music
          </h1>
          <AudioPlayer
            songs={songs}
            selectedSongId={selectedSongId}
            onSelectedSongIdChange={setSelectedSongId}
          />
          {isBreakpointOrBelow("lg") && (
            <Accordion
              groups={[songsGroup]}
              selectedGroupId={selectedGroupId}
              selectedOptionId={selectedSongId}
              onGroupClick={handleGroupClick}
              onOptionClick={handleOptionClick}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function getAccordionOption(
  song: AudioDownload,
): AccordionOption<AudioDownload> {
  return {
    id: song.id,
    title: song.title,
    subtext: format(new Date(song.date), "LLLL do, yyyy"),
    data: song,
  };
}
