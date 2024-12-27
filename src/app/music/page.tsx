"use client";

import { useState } from "react";
import { parseJSON, format } from "date-fns";
import { tz } from "@date-fns/tz";

import YoutubePlayer from "@/components/YoutubePlayer";
import { PAST_EVENTS } from "@/constants";
import Accordion from "@/components/Accordion";

export default function MusicPage() {
  const events = PAST_EVENTS ?? [];
  const defaultEvent = events && events.length > 0 ? events[0] : null;
  const defaultVideo =
    defaultEvent && defaultEvent.videos && defaultEvent.videos.length > 0
      ? defaultEvent.videos[0]
      : null;
  const [selectedVideo, setSelectedVideo] = useState(defaultVideo);
  const [autoplay, setAutoplay] = useState(false);

  // TODO: get list of past events from an api endpoint

  return (
    <section className="h-screen max-h-screen flex flex-col items-center">
      <div className="flex flex-row h-screen max-h-screen w-screen">
        <Accordion
          groups={events.map(getAccordionGroup)}
          onOptionClick={(option) => {
            setAutoplay(true);
            setSelectedVideo(option.data);
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
            width={1444}
            height={788}
            src={selectedVideo?.url}
            autoplay={autoplay}
            fallbackUrl="https://www.youtube.com/@Solar_Garlic_Band"
          />
        </div>
      </div>
    </section>
  );
}

function getAccordionOption(video) {
  return {
    id: video.id,
    title: video.title,
    subtext: video.original ? "Original" : `${video.artist} Cover`,
    data: video,
  };
}

function getAccordionGroup({ id, venue, show, timezone, videos }) {
  const datetime = parseJSON(show, { in: tz(timezone) });
  const displayDate = format(datetime, "LLLL do, yyyy");
  return {
    id: id,
    title: venue,
    subtext: displayDate,
    options: videos.map(getAccordionOption),
  };
}
