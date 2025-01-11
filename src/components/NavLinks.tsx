"use client";

import Link from "next/link";

import { NavItem } from "@/types";

interface NavLinksProps {
  items: Array<NavItem>;
  linkSize?: string;
  mobile?: boolean;
  onClick?: () => void;
}

export default function NavLinks({
  items,
  onClick,
  linkSize = "text-xl",
  mobile = false,
}: NavLinksProps) {
  const listItems = items.map((item) => (
    <li
      key={item.title}
      className={`${linkSize} text-yellow hover:text-yellow-light hover:underline`}
    >
      <Link href={item.href} onClick={() => onClick && onClick()}>
        {item.title}
      </Link>
    </li>
  ));

  if (mobile) {
    return <ul className="flex flex-col items-center gap-4">{listItems}</ul>;
  }

  return <ul className="flex flex-row gap-4">{listItems}</ul>;
}
