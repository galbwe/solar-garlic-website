"use client";

import { useState } from "react";
import { format } from "date-fns";

import { CERVANTES_RECORDINGS, SINGLES } from "@/constants";
import Accordion from "@/components/Accordion";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import useBreakpoint from "@/hooks/useBreakpoint";
import { teko } from "@/fonts";

import { AccordionGroup, AccordionOption, AudioDownload } from "@/types";

const SINGLES_GROUP_ID = "singles";
const CERVANTES_GROUP_ID = "cervantes-2026-09-13";

export default function MusicPage() {
  const { isBreakpointOrAbove, isBreakpointOrBelow } = useBreakpoint();
  const singles = SINGLES ?? [];
  const cervantesRecordings = CERVANTES_RECORDINGS ?? [];
  const songs = [...singles, ...cervantesRecordings];
  const defaults = songs.filter((song) => song.isDefault || false);
  // we know the default will be in the cervantes group, so this is kinda overkill
  const defaultSong =
    defaults.length > 0 ? defaults[0] : songs.length > 0 ? songs[0] : null;

  const [selectedSongId, setSelectedSongId] = useState<string | null>(
    defaultSong?.id ?? null,
  );
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    // TODO: do this dynamically instead of hard coding
    CERVANTES_GROUP_ID,
  );

  const handleGroupClick = (group: AccordionGroup<null, AudioDownload>) => {
    setSelectedGroupId((prev) => (prev === group.id ? null : group.id));
  };
  const handleOptionClick = (option: AccordionOption<AudioDownload>) => {
    setSelectedSongId(option.id);
  };

  const cervantesGroup: AccordionGroup<null, AudioDownload> = {
    id: CERVANTES_GROUP_ID,
    title: "Live at Cervantes 9/13/26",
    subtext: "",
    options: cervantesRecordings.map(getAccordionOption),
  };

  const singlesGroup: AccordionGroup<null, AudioDownload> = {
    id: SINGLES_GROUP_ID,
    title: "Singles",
    subtext: "",
    options: singles.map(getAccordionOption),
  };

  return (
    <section className="h-screen max-h-screen flex flex-col items-center">
      <div className="flex flex-row h-screen max-h-screen w-screen">
        {isBreakpointOrAbove("xl") && (
          <Accordion
            groups={[cervantesGroup, singlesGroup]}
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
              groups={[cervantesGroup, singlesGroup]}
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
