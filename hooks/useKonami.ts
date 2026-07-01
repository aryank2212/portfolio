"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", 
  "b", "a"
];

export function useKonami() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    let index = 0;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[index]) {
        index++;
        if (index === KONAMI_CODE.length) {
          setActivated(true);
          index = 0;
          setTimeout(() => setActivated(false), 3000);
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return activated;
}
