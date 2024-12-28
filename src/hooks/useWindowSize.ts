import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [height, setHeight] = useState(-1);
  const [width, setWidth] = useState(-1);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    height,
  };
}
