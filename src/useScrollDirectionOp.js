import { useEffect, useRef, useState } from "react";

export const useScrollDirectionOp = () => {
  const currectVal = useRef();
  const [direction, setScrollDirection] = useState(0);

  const handleScroll = () => {
    console.log("handleScroll", window.pageYOffset);
    if (window.pageYOffset !== currectVal.current) {
      const prev = currectVal.current;
      currectVal.current = window.pageYOffset;
      setScrollDirection(
        prev < currectVal.current ? "Scrolling Down" : "Scrolling Up"
      );
    }
  };

  const throttledScroll = (cb, delay) => {
    let flag = true;
    return () => {
      if (flag) {
        cb();
        flag = false;
        setTimeout(() => {
          flag = true;
        }, delay);
      }
    };
  };

  const debouncedScroll = (cb, delay) => {
    let interval;
    return () => {
      clearInterval(interval);
      interval = setTimeout(() => {
        cb();
      }, delay);
    };
  };

  const throttleScroll = debouncedScroll(handleScroll, 200);

  useEffect(() => {
    window.addEventListener("scroll", throttleScroll);
    currectVal.current = window.pageYOffset;
  }, []);

  return {
    direction,
  };
};
