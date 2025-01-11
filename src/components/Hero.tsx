"use client";

import Image from "next/image";

import lionsLair01 from "../../public/solar-garlic-lions-lair-01.jpg";
import lionsLair01Small from "../../public/solar-garlic-lions-lair-01-sm.jpg";
import NavLinks from "./NavLinks";
import { NAV_ITEMS } from "@/constants";
import { teko } from "@/fonts";
import useWindowSize from "@/hooks/useWindowSize";
import useBreakpoint from "@/hooks/useBreakpoint";

interface HeroProps {
  title: string;
}

export default function Hero({ title }: HeroProps) {
  const navItems = NAV_ITEMS.filter((item) => item.href != "/");

  const { isBreakpointOrAbove } = useBreakpoint();

  return (
    <>
      <section className="h-full flex flex-col justify-center items-center">
        <div
          className={`${teko.className} max-w-full rounded p-10 lg:bg-purple-dark/70 flex flex-col justify-center items-center gap-8 lg:gap-3`}
        >
          <h1 className="text-center text-8xl lg:text-8xl xl:text-9xl text-yellow">
            {title}
          </h1>
          {isBreakpointOrAbove("lg") ? (
            <div className="flex">
              <NavLinks items={navItems} linkSize="text-4xl" />
            </div>
          ) : (
            <div className="flex">
              <NavLinks mobile items={navItems} linkSize="text-4xl" />
            </div>
          )}
        </div>
      </section>
      <OpaqueOverlay />
      <HeroImage />
    </>
  );
}

function OpaqueOverlay() {
  return (
    <div
      className={`
    -z-40 
    min-h-full 
    min-w-96 
    w-full 
    h-auto 
    fixed 
    top-0 
    left-0 
    bg-purple-dark 
    opacity-80 
    lg:opacity-40`}
    />
  );
}

function HeroImage() {
  const { width } = useWindowSize();
  const { isBreakpointOrAbove, isBreakpointOrBelow } = useBreakpoint();

  if (isBreakpointOrAbove("lg") && isBreakpointOrBelow("xl")) {
    return (
      <Image
        fill
        className="-z-50"
        src={lionsLair01}
        alt="Solar Garlic on stage at The Lion's Lair."
      />
    );
  }

  if (isBreakpointOrAbove("2xl")) {
    return (
      <Image
        width={width <= 1800 ? 1080 : 1400}
        height={width <= 1800 ? 813 : 1054}
        className={`
              -z-50 
              fixed
              ${width <= 1800 ? "left-48" : "left-1/4"}
              top-0
            `}
        src={lionsLair01}
        alt="Solar Garlic on stage at the Lion's Lair."
      />
    );
  }

  return (
    <Image
      fill
      className="-z-50"
      src={lionsLair01Small}
      alt="Solar Garlic on stage at The Lion's Lair."
    />
  );
}
