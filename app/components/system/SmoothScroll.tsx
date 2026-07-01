"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // We only import Lenis dynamically when reducedMotion is false
    // to save bundle and avoid instantiation
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.1, anchors: true });
      let raf = 0;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });
  }, [reducedMotion]);

  return null;
}
