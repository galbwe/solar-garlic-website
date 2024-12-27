import lionsLair01 from "../../public/solar-garlic-lions-lair-01.jpg";
import lionsLair01Small from "../../public/solar-garlic-lions-lair-01-sm.jpg";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { NAV_ITEMS } from "@/constants";

interface HeroProps {
  title: string;
}

export default function Hero({ title }: HeroProps) {
  const navItems = NAV_ITEMS.filter((item) => item.href != "/");

  return (
    <>
      <section className="h-full flex flex-col justify-center items-center">
        <div className="max-w-full rounded p-10 md:bg-purple-dark/70 flex flex-col justify-center items-center gap-8 md:gap-3">
          <h1 className="text-center text-8xl md:text-8xl lg:text-9xl text-yellow">
            {title}
          </h1>
          {/* desktop nav links */}
          <div className="hidden md:flex">
            <NavLinks items={navItems} linkSize="text-4xl" />
          </div>
          {/* mobile nav links */}
          <div className="md:hidden">
            <NavLinks mobile items={navItems} linkSize="text-4xl" />
          </div>
        </div>
      </section>
      {/* opaque overlay */}
      <div className="-z-40 min-h-full min-w-96 w-full h-auto fixed top-0 left-0 bg-purple-dark opacity-80 md:opacity-40" />
      {/* full screen background image */}
      {/* <Image className="-z-50 min-h-full min-w-96 w-full h-auto fixed top-0 left-0" src={lionsLair01} alt="Solar Garlic on stage at The Lion's Lair." /> */}
      <Image
        fill
        className="invisible md:visible -z-50"
        src={lionsLair01}
        alt="Solar Garlic on stage at The Lion's Lair."
      />
      <Image
        fill
        className="visible md:invisible -z-50"
        src={lionsLair01Small}
        alt="Solar Garlic on stage at The Lion's Lair."
      />
    </>
  );
}
