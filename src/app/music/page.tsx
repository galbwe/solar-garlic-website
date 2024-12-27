"use client";

import { useState, useEffect, useMemo } from "react";
import { parseJSON, format } from "date-fns";
import { tz } from "@date-fns/tz";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";

import YoutubePlayer from "@/components/YoutubePlayer";
import { PAST_EVENTS } from "@/constants";
import Accordion from "@/components/Accordion";

import { AccordionGroup, AccordionOption, Event, Video } from "@/types";

export default function MusicPage() {
  const fullConfig = resolveConfig(tailwindConfig);
  const screens = fullConfig.theme.screens;
  const breakpoints = useMemo(() => getBreakpoints(screens), [screens]);
  const [breakpoint, setBreakpoint] = useState("");

  // change the current breakpoint when the window size changes
  // TODO: move this logic to a hook
  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getCurrentBreakpoint(breakpoints);
      if (newBreakpoint != breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, breakpoints]);

  const [playerWidth, playerHeight] = getPlayerDimensions(breakpoint);

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
        <Accordion
          groups={events.map(getAccordionGroup)}
          onOptionClick={(option) => {
            setAutoplay(true);
            setSelectedVideo(option?.data || null);
          }}
        />
        <div
          className={`
                    w-full
                    flex
                    flex-col
                    justify-start
                    items-center
                `}
        >
          <h1 className="text-7xl py-5 text-yellow">Music</h1>
          <YoutubePlayer
            width={playerWidth}
            height={playerHeight}
            src={selectedVideo?.url}
            autoplay={autoplay}
            fallbackUrl="https://www.youtube.com/@Solar_Garlic_Band"
          />
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

function getCurrentBreakpoint(breakpoints) {
  let breakpoint = "sm";
  const width = window.innerWidth;
  for (const b in breakpoints) {
    if (width >= breakpoints[b]) {
      breakpoint = b;
    }
  }
  return breakpoint;
}

function getPlayerDimensions(breakpoint: string): Array<number> {
  switch (breakpoint) {
    case "sm":
      return [300, 100];
    case "md":
      return [500, 200];
    case "lg":
      return [600, 250];
    case "xl":
      return [900, 491];
    case "2xl":
      return [1150, 628];
    default:
      return [0, 0];
  }
}

function getBreakpoints(screens) {
  const breakpoints = {};
  for (const k in screens) {
    breakpoints[k] = parseInt(screens[k].replace("px", ""));
  }
  return breakpoints;
}
