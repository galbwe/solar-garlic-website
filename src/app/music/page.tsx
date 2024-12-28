"use client";

import { useState } from "react";
import { parseJSON, format } from "date-fns";
import { tz } from "@date-fns/tz";

import YoutubePlayer from "@/components/YoutubePlayer";
import { PAST_EVENTS } from "@/constants";
import Accordion from "@/components/Accordion";
import useBreakpoint from "@/hooks/useBreakpoint";

import { AccordionGroup, AccordionOption, Event, Video } from "@/types";

export default function MusicPage() {
  const { isBreakpointOrAbove, isBreakpointOrBelow } = useBreakpoint();
  // TODO: get list of past events from an api endpoint
  const events = PAST_EVENTS ?? [];
  const defaultEvent = events && events.length > 0 ? events[0] : null;
  const defaultVideo =
    defaultEvent && defaultEvent.videos && defaultEvent.videos.length > 0
      ? defaultEvent.videos[0]
      : null;
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(
    defaultVideo,
  );
  const [autoplay, setAutoplay] = useState<boolean>(false);

  return (
    <section className="h-screen max-h-screen flex flex-col items-center">
      <div className="flex flex-row h-screen max-h-screen w-screen">
        {isBreakpointOrAbove("xl") && (
          <Accordion
            groups={events.map(getAccordionGroup)}
            onOptionClick={(option) => {
              setAutoplay(true);
              setSelectedVideo(option?.data || null);
            }}
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
          <h1 className="hidden xl:flex xl:text-7xl py-5 text-yellow">Music</h1>
          <YoutubePlayer
            src={selectedVideo?.url}
            autoplay={autoplay}
            fallbackUrl="https://www.youtube.com/@Solar_Garlic_Band"
          />
          {isBreakpointOrBelow("lg") && (
            <Accordion
              groups={events.map(getAccordionGroup)}
              onOptionClick={(option) => {
                setAutoplay(true);
                setSelectedVideo(option?.data || null);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function getAccordionOption(video: Video): AccordionOption<Video> {
  return {
    id: video.id,
    title: video.title,
    subtext: video.original ? "Original" : `${video.artist} Cover`,
    data: video,
  };
}

function getAccordionGroup({
  id,
  venue,
  show,
  videos,
  timezone = "America/Denver",
}: Event): AccordionGroup<Event, Video> {
  const datetime = parseJSON(show, { in: tz(timezone) });
  const displayDate = format(datetime, "LLLL do, yyyy");
  return {
    id: id,
    title: venue,
    subtext: displayDate,
    options: (videos ?? []).map(getAccordionOption),
  };
}
