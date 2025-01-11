import { parseJSON, format } from "date-fns";
import { tz } from "@date-fns/tz";

import { teko, notoSansDisplay } from "@/fonts";
import { Event } from "@/types";

// TODO: add a link / button to automatically create a google calendar event

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const {
    title,
    venue,
    venueUrl,
    address,
    addressUrl,
    bands,
    show,
    cover,
    timezone = "America/Denver",
  } = event;

  const datetime = parseJSON(show, { in: tz(timezone) });
  const dateFormatted = format(datetime, "EEEE LLLL do");
  const showTime = format(datetime, "haaa");

  return (
    <div className="border-2 border-purple-light bg-purple-dark flex flex-col p-8 rounded min-w-full xl:min-h-96">
      <div className="border-b-purple-light border-b-2 flex flex-col">
        <h2 className={`${teko.className} text-4xl xl:text-5xl text-yellow`}>
          {title}
        </h2>
        <p className={`${notoSansDisplay.className} text-2xl xl:text-3xl`}>
          {dateFormatted}
        </p>
      </div>
      <div className="flex flex-col gap-1 xl:gap-3 text-xl xl:text-3xl p-x-4 pt-4">
        <a
          className="hover:text-yellow hover:underline"
          href={venueUrl}
          target="_blank"
        >
          {venue}
        </a>
        <a
          className="hover:text-yellow hover:underline"
          href={addressUrl}
          target="_blank"
        >
          {address}
        </a>
        <p>show {showTime}</p>
        {!!bands && <p>With {formatBandList(bands)}</p>}
        {!!cover && <p>${cover} cover</p>}
      </div>
    </div>
  );
}

function formatBandList(bands?: Array<string>): string {
  if (!bands) {
    return "";
  } else if (bands.length == 1) {
    return bands[0];
  } else if (bands.length == 2) {
    return bands.join(" and ");
  }
  return bands.slice(0, -1).join(", ") + " and " + bands[bands.length - 1];
}
