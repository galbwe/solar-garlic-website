import { parseJSON, format } from "date-fns";
import { tz } from "@date-fns/tz";

import Image from "next/image";

import { teko, notoSansDisplay } from "@/fonts";
import { Event } from "@/types";
import locationIconWhite from "../../public/location-icon-white.svg";

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
    doors,
    cover,
    ticketsUrl,
    extraText,
    timezone = "America/Denver",
  } = event;

  const datetime = parseJSON(show, { in: tz(timezone) });
  const dateFormatted = format(datetime, "EEEE LLLL do");
  const showTime = format(datetime, "haaa");

  const doorsTime = doors
    ? format(parseJSON(doors, { in: tz(timezone) }), "haaa")
    : null;

  return (
    <div className="border-2 border-purple-light bg-purple-dark flex flex-col p-8 rounded-sm min-w-full xl:min-h-96">
      <div className="border-b-purple-light border-b-2 flex flex-row justify-between">
        <h2 className={`${teko.className} text-4xl xl:text-5xl text-yellow`}>
          {title}
        </h2>
        <p className={`${notoSansDisplay.className} text-2xl xl:text-3xl`}>
          {dateFormatted}
        </p>
      </div>
      <div className="flex flex-col gap-2 xl:gap-4 text-xl xl:text-3xl p-x-4 pt-4">
        <div className="flex flex-row justify-between">
          <a
            className="hover:text-yellow hover:underline"
            href={venueUrl}
            target="_blank"
          >
            {venue}
          </a>

          <p>
            {!!doors && <span>Doors {doorsTime}, </span>}Show {showTime}
          </p>
        </div>
        <a
          className="hover:text-yellow hover:underline font-light"
          href={addressUrl}
          target="_blank"
        >
          <div className="flex flex-row gap-2">
            <Image
              src={locationIconWhite}
              alt="Location icon"
              width={30}
              height={30}
            />
            {address}
          </div>
        </a>

        {!!bands && <BandList bands={bands} />}
        {!!cover && <p>${cover} cover</p>}
        {!!ticketsUrl && (
          <a
            className="hover:text-yellow hover:underline"
            href={ticketsUrl}
            target="_blank"
          >
            {address}
          </a>
        )}
        {!!extraText && <p className="text-md font-light">{extraText}</p>}
      </div>
    </div>
  );
}

function BandList({ bands }: { bands: Array<string> }) {
  if (!bands) {
    return <></>;
  } else if (bands.length == 1) {
    return (
      <p>
        With <BandName band={bands[0]} />
      </p>
    );
  } else if (bands.length == 2) {
    return (
      <p>
        With <BandName band={bands[0]} /> and <BandName band={bands[1]} />
      </p>
    );
  } else {
    return (
      <p>
        With <BandName band={bands[0]} />
        {bands.slice(1, -1).map((band) => {
          return (
            <>
              , <BandName band={band} />
            </>
          );
        })}{" "}
        and <BandName band={bands[bands.length - 1]} />
      </p>
    );
  }
}

function BandName({ band }: { band: string }) {
  return <span className={"font-semibold"}>{band}</span>;
}
