export interface AccordionGroup<G, O> {
  id: string;
  title: string;
  subtext: string;
  options: Array<AccordionOption<O>>;
  data?: G;
}

export interface AccordionOption<O> {
  id: string;
  title: string;
  subtext: string;
  data?: O;
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  venueUrl?: string;
  address?: string;
  addressUrl?: string;
  bands?: Array<string>;
  doors?: string;
  show: string;
  timezone?: string;
  cover?: number;
  videos?: Array<Video>;
  ticketsUrl?: string;
  extraText?: string;
}

export interface NavItem {
  title: string;
  href: string;
}

export interface Video {
  id: string;
  title: string;
  artist?: string;
  original?: boolean;
  url: string;
}

export interface Screens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}
