import bandPhoto from "../../../public/band-photo-01.jpg";
import Image from "next/image";
import { teko } from "@/fonts";

export default function About() {
  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center gap-1">
      <section className="mt-8 p-4 md:p-12 text-2xl w-5/6 lg:w-4/5 2xl:w-2/5 flex flex-col gap-3 bg-purple-dark rounded border-2 border-purple-light">
        <h1
          className={`${teko.className} text-5xl md:text-7xl text-yellow pb-2`}
        >
          About
        </h1>
        <p>
          Solar Garlic is a Denver-based jam band mixing funk and indie vibes
          into their original music and covers. Brought together in late 2023
          through a mutual love of melting faces at local jam sessions, they
          quickly developed musical chemistry and were playing small bars by
          early 2024. They can frequently be found delivering their unique style
          of jam music at local Denver venues such as The Lion&apos;s Lair, The
          Roxy on Broadway, and Goosetown Tavern.
        </p>
        <p>Solar Garlic consists of:</p>
        <ul className="gap-2">
          <li>
            <span className="font-bold">Davie Pyle</span> on guitar and vocals
          </li>
          <li>
            <span className="font-bold">Sabrina Scherma</span> on guitar, keys,
            and vocals
          </li>
          <li>
            <span className="font-bold">Haley Brueckman</span> on drums{" "}
          </li>
          <li>
            <span className="font-bold">Wes Galbraith</span> on bass and vocals.
          </li>
        </ul>
        <p>
          The band is excited to introduce new music and return to the stage in
          2025. See you out there!
        </p>
      </section>
      <Image
        className="mt-5 2xl:max-w-3xl 2xl:ml-5 rounded border-2 border-purple-light"
        src={bandPhoto}
        height={460}
        width={460}
        alt="Solar Garlic on stage at Fracos bar in Littleton."
      />
    </div>
  );
}
