"use client";

import Image from "next/image";

import { AccordionGroup, AccordionOption } from "@/types";
import chevronDown from "../../public/chevron-down.svg";
import chevronRight from "../../public/chevron-right.svg";
import { teko, notoSansDisplay } from "@/fonts";

interface AccordionProps<G, O> {
  groups: Array<AccordionGroup<G, O>>;
  selectedGroupId?: string | null;
  selectedOptionId?: string | null;
  onGroupClick?: (group: AccordionGroup<G, O>) => void;
  onOptionClick?: (option: AccordionOption<O>) => void;
}

export default function Accordion<G, O>({
  groups,
  selectedGroupId = null,
  selectedOptionId = null,
  onGroupClick = () => {},
  onOptionClick = () => {},
}: AccordionProps<G, O>) {
  return (
    <ul
      className={`
            accordion
            border-r-0 xl:border-r-2 
            border-r-purple-light 
            border-t-2 xl:border-t-0
            border-t-purple-light
            flex flex-col 
            w-full
            min-w-28
            max-w-full
            min-h-1/4
            max-h-full
            xl:min-w-80
            xl:w-80
            xl:max-w-80
            xl:h-full
            bg-purple
            overflow-y-auto
        `}
    >
      {groups.map((group, i) => {
        return (
          <li key={`event-card-${i}`}>
            <div
              className="flex flex-row cursor-pointer w-full justify-between px-3 py-3 border-b-2 border-b-purple-light"
              onClick={() => onGroupClick(group)}
            >
              <div className="flex flex-col">
                <h2 className={`${teko.className} text-2xl text-yellow`}>
                  {group.title}
                </h2>
                <p>{group.subtext}</p>
              </div>
              {selectedGroupId === group.id ? (
                <Image
                  src={chevronDown}
                  alt="Chevron down icon"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src={chevronRight}
                  alt="Chevron right icon"
                  width={16}
                  height={16}
                />
              )}
            </div>
            <ul>
              {selectedGroupId === group.id &&
                group.options.map((option, j) => {
                  const bgColor = j % 2 == 0 ? "purple" : "purple-dark";
                  const border =
                    selectedOptionId === option.id
                      ? "border-y-2 border-y-yellow"
                      : "border-b-2 border-b-purple-light";
                  return (
                    <li
                      key={`event-video-${i}-${j}`}
                      className={`
                          ${border}
                          cursor-pointer
                          px-3
                          py-1
                          flex
                          flex-col
                          bg-${bgColor}
                      `}
                      onClick={() => onOptionClick(option)}
                    >
                      <h2
                        className={`${notoSansDisplay.className} text-lg text-yellow`}
                      >
                        {option.title}
                      </h2>
                      <p>{option.subtext}</p>
                    </li>
                  );
                })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
