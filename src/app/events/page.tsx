import Image from "next/image";

import djGuysPhoto01 from "../../../public/solar-garlic-dj-guys-01.png";
import EventCard from "@/components/EventCard";
import SocialLinks from "@/components/SocialLinks";
import { EVENTS } from "@/constants";
import { teko } from "@/fonts";

export default function EventPage() {
  const events = EVENTS;

  return (
    <section className="mt-8 px-2 md:px-4 lg:px-8 flex flex-col items-center">
      <h1 className={`${teko.className} text-8xl text-yellow`}>Events</h1>
      <div className="flex flex-row flex-wrap justify-around items-center">
        <div className="flex flex-col gap-4 pt-8 items-center">
          {!!events ? (
            events.map((e) => <EventCard key={e.title} event={e} />)
          ) : (
            <>
              <p className="max-w-80 text-4xl self-start">No upcoming shows.</p>
              <p className="max-w-80 text-xl self-start">
                Check us out on social or join our mailing list to find out
                about our next show.
              </p>
              <SocialLinks />
            </>
          )}
        </div>
        <div className="p-8">
          <Image
            className="rounded border-b-2 border-b-purple-light"
            width={480}
            height={480}
            src={djGuysPhoto01}
            alt="Solar Garlic jamming at a rehearsal"
          />
        </div>
      </div>
    </section>
  );
}
