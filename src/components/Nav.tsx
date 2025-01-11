"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../public/solar-garlic-logo.jpg";
import hamburgerIcon from "../../public/hamburger.svg";
import closeIcon from "../../public/close.svg";
import { NavItem } from "@/types";
import NavLinks from "@/components/NavLinks";
import SocialLinks from "@/components/SocialLinks";
import { teko } from "@/fonts";
import useBreakpoint from "@/hooks/useBreakpoint";

interface NavProps {
  items: Array<NavItem>;
  breakpoint?: number;
}

// TODO: change purple and yellow to more generic names for colors according to a theme

export default function Nav({ items, breakpoint }: NavProps) {
  const { isBreakpointOrAbove } = useBreakpoint();

  // TODO: refactor to use breakpoint hooks instead of rendering multiple navs

  if (isBreakpointOrAbove("xl")) {
    return <NavDesktop items={items} breakpoint={breakpoint} />;
  }
  return <NavMobile items={items} breakpoint={breakpoint} />;
}

function NavDesktop({ items }: NavProps) {
  return (
    <nav
      className={`flex justify-between items-center h-24 pr-6 bg-purple-dark border-b-2 border-b-purple-light ${teko.className}`}
    >
      <Link
        href="/"
        className="text-2xl text-yellow flex flex-row gap-2 h-full self-start"
      >
        <Image src={logo} alt="Solar Garlic Logo" height={50} width={100} />
      </Link>
      <div className="flex flex-row gap-6 justify-end items-center">
        <NavLinks items={items} linkSize="text-3xl" />
        <SocialLinks />
      </div>
    </nav>
  );
}

function NavMobile({ items }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`flex flex-col ${teko.className}`}>
      <div className="pl-0 pr-3 flex flex-row justify-between items-center h-24 bg-purple-dark border-b-2 border-b-purple-light">
        <Link
          href="/"
          className="text-2xl text-yellow flex flex-row gap-2 h-full"
        >
          <Image src={logo} alt="Solar Garlic Logo" height={50} width={100} />
        </Link>
        {isMenuOpen ? (
          <Image
            onClick={closeMenu}
            src={closeIcon}
            height={40}
            width={40}
            alt="Exit icon"
          />
        ) : (
          <Image
            onClick={openMenu}
            src={hamburgerIcon}
            height={30}
            width={30}
            alt="Hamburger icon"
          />
        )}
      </div>
      {isMenuOpen && (
        <div className="bg-purple-dark border-b-2 border-b-purple-light p-4">
          {/* // menu drawer with nav links */}
          <NavLinks
            mobile
            items={items}
            linkSize="text-4xl"
            onClick={closeMenu}
          />
        </div>
      )}
    </nav>
  );
}
