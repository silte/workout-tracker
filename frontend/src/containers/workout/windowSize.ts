import { useLayoutEffect, useState } from 'react';


export const useWindowWidth = () => {
    const [Width, setWidth] = useState(0);

    useLayoutEffect(() => {
      function updateSize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return Width;
  }
  