"use client";

import Image from "next/image";
import { compareAsc, constructNow, parseJSON } from "date-fns";

import djGuysPhoto01 from "../../../public/solar-garlic-dj-guys-01.png";
import EventCard from "@/components/EventCard";
import SocialLinks from "@/components/SocialLinks";
import { EVENTS } from "@/constants";
import { teko } from "@/fonts";
import useBreakpoint from "@/hooks/useBreakpoint";

import type { Event } from "@/types";

export default function EventPage() {
  // const events = getFutureEvents(EVENTS);

  const { isBreakpointOrBelow } = useBreakpoint();

  return (
    <section className="mt-8 px-2 md:px-4 lg:px-8 flex flex-col items-center">
      <h1 className={`${teko.className} text-8xl text-yellow`}>Events</h1>
      <div className="flex flex-row flex-wrap justify-center items-center xl:items-start w-full">
        <div className="flex flex-col gap-4 pt-8 items-center xl:items-start xl:w-5/12 xl:h-full">
          {!!events ? (
            events.map((e) => <EventCard key={e.title} event={e} />)
          ) : (
            <>
              <p className="max-w-80 text-4xl self-start">No upcoming shows.</p>
              <p className="max-w-80 text-xl self-start">
                Check us out on social to find out about our next show.
              </p>
              <SocialLinks width={40} height={40} />
            </>
          )}
        </div>
        <div className="p-8">
          <Image
            className="rounded border-b-2 border-b-purple-light"
            width={isBreakpointOrBelow("lg") ? 480 : 700}
            height={isBreakpointOrBelow("lg") ? 480 : 700}
            src={djGuysPhoto01}
            alt="Solar Garlic jamming at a rehearsal"
          />
        </div>
      </div>
    </section>
  );
}

// TODO: move to a utility module
function getFutureEvents(events: Array<Event>): Array<Event> {
  return events.filter((event) => {
    const eventDate = parseJSON(event.show);
    const now = constructNow(eventDate);
    return compareAsc(now, eventDate) <= 0;
  });
}
