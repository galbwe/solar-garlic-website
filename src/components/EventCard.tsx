"use client";

import { parseJSON, format } from "date-fns";
import { tz } from "@date-fns/tz";

import Image from "next/image";
import { useState } from "react";

import { teko, notoSansDisplay } from "@/fonts";
import { Event, TicketInfo } from "@/types";
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
    ticketInfo,
  } = event;

  const [showTicketInfo, setShowTicketInfo] = useState<boolean>(false);

  const datetime = parseJSON(show, { in: tz(timezone) });
  const dateFormatted = format(datetime, "EEEE LLLL do");
  const showTime = format(datetime, "h:mmaaa");

  const doorsTime = doors
    ? format(parseJSON(doors, { in: tz(timezone) }), "haaa")
    : null;

  return (
    <div className="border-2 border-purple-light bg-purple flex flex-col p-6 xl:p-8 rounded-sm min-w-full xl:min-h-96">
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
            rel="noopener noreferrer"
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
          rel="noopener noreferrer"
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
            rel="noopener noreferrer"
          >
            {address}
          </a>
        )}
        {!!extraText && <p className="text-md font-light">{extraText}</p>}

        {!!ticketInfo && !showTicketInfo && (
          <div className="w-full flex flex-row justify-center">
            <button
              type="submit"
              className="cursor-pointer text-2xl font-bold bg-blue-500 text-white px-4 py-2 mt-4 rounded-sm w-full xl:w-1/2 h-14"
              onClick={() => setShowTicketInfo(true)}
            >
              Get Tickets
            </button>
          </div>
        )}

        {!!ticketInfo && showTicketInfo && (
          <TicketInfoPanel ticketInfo={ticketInfo} />
        )}
      </div>
    </div>
  );
}

function TicketInfoPanel({ ticketInfo }: { ticketInfo: TicketInfo }) {
  return (
    <div className="mt-4 text-xl xl:text-2xl bg-purple-light p-2 xl:p-4">
      <p>{ticketInfo.text}</p>
      <ul className="mt-2 flex flex-col gap-1">
        {ticketInfo.links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFCB2E" }}
              className="underline hover:opacity-80"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
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
