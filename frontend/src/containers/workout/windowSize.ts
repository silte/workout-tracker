import { useLayoutEffect, useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export const useWindowWidth = (): number => {
  const [Width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return Width;
};
