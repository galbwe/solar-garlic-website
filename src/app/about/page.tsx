"use client";

import bandPhoto from "../../../public/band-photo-02.jpg";
import davie from "../../../public/davie.jpg";
import hazel from "../../../public/hazel.jpg";
import sabrina from "../../../public/sabrina.jpg";
import wes from "../../../public/wes.jpg";
import useBreakpoint from "@/hooks/useBreakpoint";

import Image from "next/image";
import { teko } from "@/fonts";

export default function About() {
  const { isBreakpointOrAbove } = useBreakpoint();

  return (
    <div className="w-screen flex flex-col justify-center items-center xl:gap-6 xl:mt-12 pb-40">
      <h1
        className={`${teko.className} text-5xl md:text-7xl text-yellow pb-0 xl:pb-2`}
      >
        About
      </h1>
      <section className="flex flex-row max-w-full xl:max-w-4/5 justify-center gap-4">
        <div className="w-full xl:w-1/3 p-4 md:p-12 text-2xl bg-purple lg:rounded-sm border-y-2 lg:border-2 border-purple-light">
          <p>
            Solar Garlic is a Denver-based jam band mixing funk and indie vibes
            into their original music and covers. Brought together in late 2023
            through a mutual love of melting faces at local jam sessions, they
            quickly developed musical chemistry and were playing small bars by
            early 2024. They can frequently be found delivering their unique
            style of jam music at local Denver venues such as The Lion&apos;s
            Lair, The Roxy on Broadway, and Goosetown Tavern.
          </p>
          <p className="mt-4">
            The band is excited to introduce new music and return to the stage
            in 2026. See you out there!
          </p>
        </div>
        {!!isBreakpointOrAbove("xl") && (
          <div className="xl:w-2/3">
            <Image
              className="w-full h-full aspect-video object-cover rounded-sm border-2 border-purple-light"
              src={bandPhoto}
              width={1200}
              height={675}
              alt="Solar Garlic at a rehearsal"
            />
          </div>
        )}
      </section>

      <section className="mt-15 flex flex-col max-w-4/5 justify-center items-center gap-10">
        <h2
          className={`${teko.className} text-3xl md:text-6xl text-yellow pb-0 xl:pb-2`}
        >
          The Band
        </h2>

        <ul className="gap-8 flex flex-row flex-wrap justify-center items-center text-2xl">
          <li>
            <span className="font-bold">Davie Pyle</span> on guitar and vocals
            <Image
              className="mt-5 2xl:max-w-3xl 2xl:ml-5 rounded-sm border-2 border-purple-light"
              src={davie}
              width={600}
              alt="Davie Pyle"
            />
          </li>
          <li>
            <span className="font-bold">Sabrina Scherma</span> on guitar, keys,
            and vocals
            <Image
              className="mt-5 2xl:max-w-3xl 2xl:ml-5 rounded-sm border-2 border-purple-light"
              src={sabrina}
              width={600}
              alt="Sabrina Scherma"
            />
          </li>
          <li>
            <span className="font-bold">Hazel Brueckman</span> on drums and
            vocals
            <Image
              className="mt-5 2xl:max-w-3xl 2xl:ml-5 rounded-sm border-2 border-purple-light"
              src={hazel}
              width={600}
              alt="Hazel Brueckman"
            />
          </li>
          <li>
            <span className="font-bold">Wes Galbraith</span> on bass and vocals
            <Image
              className="mt-5 2xl:max-w-3xl 2xl:ml-5 rounded-sm border-2 border-purple-light"
              src={wes}
              width={600}
              alt="Wes Galbraith"
            />
          </li>
        </ul>
      </section>
    </div>
  );
}
