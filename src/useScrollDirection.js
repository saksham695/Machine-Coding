import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollDirection = () => {
  //   const [currPosition, setCurrentPosition] = useState(0);
  //   const [prevPosition, setPreviousPosition] = useState(0);

  const currPosition = useRef();
  const prevPosition = useRef();
  const [direction, setDirection] = useState("");

  // The scroll listener
  const handleScroll = useCallback(() => {
    console.log("Function Called handleScroll");
    currPosition.current = window.pageYOffset;
    const currentDirection =
      currPosition.current > prevPosition.current
        ? "Scrolling Down"
        : "Scrolling Up";
    // console.log(currentDirection);
    if (currentDirection !== direction) {
      setDirection(currentDirection);
    }
    prevPosition.current = window.pageYOffset;
  }, []);

  const throttle = (cb, delay) => {
    let flag = true;
    return () => {
      if (flag) {
        cb();
        flag = false;
        setTimeout(() => {
          flag = true;
        }, [delay]);
      }
    };
  };

  const throttledScroll = throttle(handleScroll, 1000);

  // Attach the scroll listener to the div
  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    currPosition.current = 0;
    prevPosition.current = 0;
    return () => {
      //
      setDirection("");
    };
  }, [handleScroll]);

  return { direction };
};
