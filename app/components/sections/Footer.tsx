"use client";

import { useEffect, useRef } from "react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { COPY } from "@/lib/copy";
import { useKonami } from "@/hooks/useKonami";

export default function Footer() {
  const konamiActive = useKonami();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!konamiActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: {x: number, y: number, vx: number, vy: number}[] = [];
    for(let i=0; i<200; i++) {
      particles.push({
        x: width/2, y: height/2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20
      });
    }

    let rafId: number;
    const render = () => {
      ctx.fillStyle = "rgba(7, 8, 12, 0.2)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = Math.random() > 0.5 ? "#22d3ee" : "#34d399";
        ctx.fillRect(p.x, p.y, 2, 2);
      });

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(rafId);
  }, [konamiActive]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-line bg-bg pt-16 pb-24 md:pb-16 overflow-hidden">
      {konamiActive && (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 rounded bg-emerald px-4 py-2 font-mono text-xs font-bold text-bg shadow-lg">
            achievement unlocked: you read the docs
          </div>
        </>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="flex items-center gap-3 font-mono text-sm font-bold text-cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              SIGNAL_SYS
            </div>
            <p className="max-w-xs text-sm text-muted">
              {COPY.footer.text}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] tracking-widest text-muted">SITEMAP</h4>
              <ul className="flex flex-col gap-2 font-mono text-sm">
                {NAV_LINKS.map(link => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="text-body transition-colors hover:text-cyan">
                      /sys/{link.id}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] tracking-widest text-muted">NETWORK</h4>
              <ul className="flex flex-col gap-2 font-mono text-sm">
                {SITE.socials.map(social => (
                  <li key={social.label}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-body transition-colors hover:text-cyan"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-line pt-8 md:flex-row">
          <div className="mb-4 font-mono text-[10px] text-muted md:mb-0">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted transition-colors hover:text-cyan focus:outline-none"
          >
            <span>BACK TO TOP</span>
            <div className="flex h-6 w-6 items-center justify-center rounded border border-line transition-colors group-hover:border-cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
