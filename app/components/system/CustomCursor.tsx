"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const s = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    rx: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    ry: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    hover: false,
    down: false,
  });

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      s.current.x = e.clientX;
      s.current.y = e.clientY;

      const t = e.target as HTMLElement | null;
      if (!t) return;
      s.current.hover = !!(
        t.closest("[data-cursor]") ||
        t.tagName === "A" || t.tagName === "BUTTON" ||
        t.closest("button") || t.closest("a")
      );
    };

    const onDown = () => { s.current.down = true; };
    const onUp = () => { s.current.down = false; };
    const hide = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const show = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.body.addEventListener("mouseleave", hide);
    document.body.addEventListener("mouseenter", show);

    let raf: number;
    const render = () => {
      const c = s.current;

      // Ring trails just behind — fast enough to feel connected
      c.rx += (c.x - c.rx) * 0.3;
      c.ry += (c.y - c.ry) * 0.3;

      const press = c.down ? 0.82 : 1;

      // Dot: snaps to cursor, shrinks on hover
      dot.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%) scale(${press})`;
      if (c.hover) {
        dot.style.width = "5px";
        dot.style.height = "5px";
        dot.style.background = "#22d3ee";
        dot.style.boxShadow = "0 0 8px rgba(34,211,238,0.6), 0 0 20px rgba(34,211,238,0.2)";
      } else {
        dot.style.width = "7px";
        dot.style.height = "7px";
        dot.style.background = "#e2e8f0";
        dot.style.boxShadow = "0 0 6px rgba(226,232,240,0.25)";
      }

      // Ring: trails, grows on hover with cyan glow
      ring.style.transform = `translate3d(${c.rx}px, ${c.ry}px, 0) translate(-50%, -50%) scale(${press})`;
      if (c.hover) {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "rgba(34,211,238,0.6)";
        ring.style.background = "rgba(34,211,238,0.04)";
        ring.style.boxShadow = "0 0 12px rgba(34,211,238,0.12), inset 0 0 8px rgba(34,211,238,0.04)";
      } else {
        ring.style.width = "26px";
        ring.style.height = "26px";
        ring.style.borderColor = "rgba(226,232,240,0.35)";
        ring.style.background = "rgba(226,232,240,0.02)";
        ring.style.boxShadow = "0 0 8px rgba(226,232,240,0.05)";
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.removeEventListener("mouseleave", hide);
      document.body.removeEventListener("mouseenter", show);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full opacity-0 will-change-transform"
        style={{
          width: "26px",
          height: "26px",
          border: "1.5px solid rgba(226,232,240,0.35)",
          background: "rgba(226,232,240,0.02)",
          boxShadow: "0 0 8px rgba(226,232,240,0.05)",
          backdropFilter: "blur(1px)",
          transition: "width 0.22s cubic-bezier(0.22,1,0.36,1), height 0.22s cubic-bezier(0.22,1,0.36,1), border-color 0.22s ease, background 0.22s ease, box-shadow 0.25s ease",
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full opacity-0 will-change-transform"
        style={{
          width: "7px",
          height: "7px",
          background: "#e2e8f0",
          boxShadow: "0 0 6px rgba(226,232,240,0.25)",
          transition: "width 0.18s ease, height 0.18s ease, background 0.18s ease, box-shadow 0.25s ease",
        }}
      />
    </>
  );
}
