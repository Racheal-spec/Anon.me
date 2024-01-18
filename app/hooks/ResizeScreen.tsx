import React, { useEffect, useState } from "react";

export const UseResizeScreen = () => {
  const [windowDimension, setWindowDimension] = useState(0);
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowDimension <= 640;
  // const isDesktop = windowDimension > 768;
  // const isTablet = windowDimension > 640 || windowDimension < 810;
  return isMobile;
};
