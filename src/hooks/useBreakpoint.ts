import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";

import useWindowSize from "./useWindowSize";

import { Screens, Breakpoints } from "@/types";

export default function useBreakpoint() {
  const { width } = useWindowSize();

  const fullConfig = resolveConfig(tailwindConfig);
  const screens: Screens = fullConfig.theme.screens;
  const breakpoints: Breakpoints = getBreakpoints(screens);
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

/**
 * @param screens A mapping from next js breakpoints (sm, md, lg, etc, ...) to screen widths in pixels
 * @return A mapping from next js breakpoints to the integer values corresponding to screen widths where breakpoints occur
 */
function getBreakpoints(screens: Screens): Breakpoints {
  const convertPixelsToNumber = (pixels: string) =>
    parseInt(pixels.replace("px", ""));
  return {
    sm: convertPixelsToNumber(screens.sm),
    md: convertPixelsToNumber(screens.md),
    lg: convertPixelsToNumber(screens.lg),
    xl: convertPixelsToNumber(screens.xl),
    "2xl": convertPixelsToNumber(screens["2xl"]),
  };
}

/**
 * @param breakpoints maps breakpoint names (sm, md, lg, etc., ...) to screen pixel width as an integer
 * @param width the current screen width
 * @return The name of the largest breakpoint with a width less than or equal to the current screen width
 *
 */
function getCurrentBreakpoint(breakpoints: Breakpoints, width: number): string {
  if (width >= breakpoints["2xl"]) {
    return "2xl";
  } else if (width >= breakpoints.xl) {
    return "xl";
  } else if (width >= breakpoints.lg) {
    return "lg";
  } else if (width >= breakpoints.md) {
    return "md";
  } else {
    return "sm";
  }
}
