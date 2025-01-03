"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import sunIcon from "../../public/sun.svg";
import garlicIcon from "../../public/garlic.svg";
import hamburgerIcon from "../../public/hamburger.svg";
import closeIcon from "../../public/close.svg";
import { NavItem } from "@/types";
import NavLinks from "@/components/NavLinks";
import SocialLinks from "@/components/SocialLinks";
import { teko } from "@/fonts";

interface NavProps {
  title: string;
  items: Array<NavItem>;
  breakpoint?: number;
}

// TODO: change purple and yellow to more generic names for colors according to a theme

export default function Nav({ title, items }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // TODO: refactor to use breakpoint hooks instead of rendering multiple navs

  return (
    <>
      {/* nav for xl breakpoint and up */}
      <nav
        className={`hidden xl:flex justify-between items-center h-20 p-8 bg-purple-dark border-b-2 border-b-purple-light ${teko.className}`}
      >
        <Link href="/" className="text-2xl text-yellow flex flex-row gap-2">
          <Image src={sunIcon} alt="Sun icon" height={25} width={25} />
          <h2 className={`${teko.className}`}>{title}</h2>
          <Image src={garlicIcon} alt="Garlic icon" height={25} width={25} />
        </Link>
        <NavLinks items={items} linkSize="text-2xl" />
        <SocialLinks />
      </nav>
      {/* nav for mobile */}
      <nav className={`xl:hidden flex flex-col ${teko.className}`}>
        <div className="flex flex-row justify-between items-center h-20 p-8 bg-purple-dark border-b-2 border-b-purple-light">
          <Link href="/" className="text-2xl text-yellow flex flex-row gap-2">
            <Image src={sunIcon} alt="Sun icon" height={25} width={25} />
            <h2 className={`${teko.className}`}>{title}</h2>
            <Image src={garlicIcon} alt="Garlic icon" height={25} width={25} />
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
    </>
  );
}
