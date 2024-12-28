"use client";

import { useState } from "react";
import Image from "next/image";

import { AccordionGroup, AccordionOption, Event, Video } from "@/types";
import chevronDown from "../../public/chevron-down.svg";
import chevronLeft from "../../public/chevron-left.svg";

interface AccordionProps<G, O> {
  groups: Array<AccordionGroup<G, O>>;
  onGroupClick?: () => void;
  onOptionClick?: (option: AccordionOption<O>) => void;
}

export default function Accordion({
  groups,
  onGroupClick = () => {},
  onOptionClick = ({}) => {},
}: AccordionProps<Event, Video>) {
  const [selectedGroup, setSelectedGroup] = useState<AccordionGroup<
    Event,
    Video
  > | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<AccordionOption<Video> | null>(null);

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
            max-h-1/2
            xl:min-w-80
            xl:w-80
            xl:max-w-80
            xl:h-full
            bg-purple-dark
            overflow-scroll
        `}
    >
      {groups.map((group, i) => {
        return (
          <li key={`event-card-${i}`}>
            <div
              className="flex flex-row cursor-pointer w-full justify-between px-3 py-3 border-b-2 border-b-purple-light"
              onClick={() => {
                if (selectedGroup && selectedGroup.id === group.id) {
                  // unselect the group
                  setSelectedGroup(null);
                } else {
                  setSelectedGroup(group);
                }
                onGroupClick();
              }}
            >
              <div className="flex flex-col">
                <h2 className="text-2xl text-yellow">{group.title}</h2>
                <p>{group.subtext}</p>
              </div>
              {group && selectedGroup && selectedGroup.id === group.id ? (
                <Image
                  src={chevronDown}
                  alt="Chevron down icon"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src={chevronLeft}
                  alt="Chevron left icon"
                  width={16}
                  height={16}
                />
              )}
            </div>
            <ul>
              {group &&
                selectedGroup &&
                selectedGroup.id === group.id &&
                group.options.map((option, j) => {
                  const bgColor = j % 2 == 0 ? "purple" : "purple-dark";
                  const border =
                    option && selectedOption && option.id === selectedOption.id
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
                      onClick={() => {
                        setSelectedOption(option);
                        onOptionClick(option);
                      }}
                    >
                      <h2 className="text-lg text-yellow">{option.title}</h2>
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
