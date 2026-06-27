import { useState, useEffect } from "react";

/**
 * Returns a debounced version of `value` that only updates after
 * `delayMs` milliseconds have elapsed since the last change.
 *
 * Useful for expensive operations triggered by high-frequency events
 * like window resize or text input.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // Cancel the timer if value changes before delayMs has elapsed.
    // This is the key: only the *last* value wins.
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
