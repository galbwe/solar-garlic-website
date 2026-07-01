import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

interface WindowSize {
  width: number | null;
  height: number | null;
}

function getWindowSize(): WindowSize {
  if (typeof window === "undefined") return { width: null, height: null };
  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * Returns the current window dimensions, debounced by 100ms.
 * Values are `null` during SSR or before the first measurement.
 */
export default function useWindowSize(): WindowSize {
  // Always start with null so the server and client initial renders match.
  // Reading window.innerWidth in the lazy initializer causes a hydration
  // mismatch because the server can't call getWindowSize() meaningfully.
  const [size, setSize] = useState<WindowSize>({ width: null, height: null });

  useEffect(() => {
    const handleResize = () => setSize(getWindowSize());
    // Populate real dimensions after mount (client-only).
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useDebounce(size, 100);
}
