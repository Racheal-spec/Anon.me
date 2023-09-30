import React, { useEffect, useRef } from "react";

export const UseClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleProfileClose = (event: any) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref?.current?.contains(target)) {
        callback();
      }
    };
    document.addEventListener("click", handleProfileClose);
    return () => {
      document.removeEventListener("click", handleProfileClose);
    };
  }, [ref]);

  return ref;
};
