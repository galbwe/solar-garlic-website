import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";

import useWindowSize from "./useWindowSize";

export default function useBreakpoint() {
  const { width } = useWindowSize();

  const fullConfig = resolveConfig(tailwindConfig);
  const screens = fullConfig.theme.screens;
  const breakpoints = getBreakpoints(screens);
  const breakpoint = getCurrentBreakpoint(breakpoints, width);

  // change the current breakpoint when the window size changes
  const isSm = breakpoint === "sm";
  const isMd = breakpoint === "md";
  const isLg = breakpoint === "lg";
  const isXl = breakpoint === "xl";
  const is2Xl = breakpoint === "2xl";

  function isBreakpointOrAbove(b: string): boolean {
    switch (b) {
      case "sm":
        return isSm || isMd || isLg || isXl || is2Xl;
      case "md":
        return isMd || isLg || isXl || is2Xl;
      case "lg":
        return isLg || isXl || is2Xl;
      case "xl":
        return isXl || is2Xl;
      case "2xl":
        return is2Xl;
      default:
        return false;
    }
  }

  function isBreakpointOrBelow(b: string): boolean {
    switch (b) {
      case "2xl":
        return isSm || isMd || isLg || isXl || is2Xl;
      case "xl":
        return isSm || isMd || isLg || isXl;
      case "lg":
        return isSm || isMd || isLg;
      case "md":
        return isSm || isMd;
      case "sm":
        return isSm;
      default:
        return false;
    }
  }

  return {
    breakpoint,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isBreakpointOrAbove,
    isBreakpointOrBelow,
  };
}

function getBreakpoints(screens) {
  const breakpoints = {};
  for (const k in screens) {
    breakpoints[k] = parseInt(screens[k].replace("px", ""));
  }
  return breakpoints;
}

function getCurrentBreakpoint(breakpoints, width) {
  let breakpoint = "sm";
  for (const b in breakpoints) {
    if (width >= breakpoints[b]) {
      breakpoint = b;
    }
  }
  return breakpoint;
}
