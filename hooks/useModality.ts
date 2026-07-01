"use client";

import { useEffect } from "react";

export function useModality() {
  useEffect(() => {
    let hasSet = false;
    const setMouse = () => {
      if (!hasSet || document.body.getAttribute("data-cursor-modality") !== "mouse") {
        document.body.setAttribute("data-cursor-modality", "mouse");
        hasSet = true;
      }
    };
    const setKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.setAttribute("data-cursor-modality", "keyboard");
        hasSet = true;
      }
    };
    
    // Default to mouse
    setMouse();

    window.addEventListener("mousemove", setMouse, { passive: true });
    window.addEventListener("mousedown", setMouse, { passive: true });
    window.addEventListener("keydown", setKeyboard, { passive: true });

    return () => {
      window.removeEventListener("mousemove", setMouse);
      window.removeEventListener("mousedown", setMouse);
      window.removeEventListener("keydown", setKeyboard);
    };
  }, []);
}
