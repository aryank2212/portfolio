"use client";

import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import { JOBS } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Changelog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="changelog" className="mx-auto w-full max-w-4xl px-4 py-24 md:px-8">
      <SectionHeader route="changelog" title="Experience" />
      
      <div className="relative mt-16 pl-8 md:pl-0" ref={containerRef}>
        {/* Timeline line */}
        <div className="absolute bottom-0 left-8 top-0 w-px bg-line md:left-[50%] md:-translate-x-px" aria-hidden="true" />
        
        {/* Animated fill line */}
        {!reducedMotion && (
          <motion.div 
            className="absolute bottom-0 left-8 top-0 w-px origin-top bg-cyan md:left-[50%] md:-translate-x-px" 
            style={{ scaleY }}
            aria-hidden="true"
          />
        )}

        <div className="flex flex-col gap-16 md:gap-24">
          {JOBS.map((job, i) => (
            <div key={job.company} className="relative flex flex-col md:flex-row md:justify-between">
              
              {/* Timeline Node */}
              <div className="absolute -left-10 top-1.5 flex h-4 w-4 items-center justify-center md:left-[50%] md:-translate-x-[50%]">
                <div className="h-2 w-2 rounded-full bg-surface ring-2 ring-line" />
                {job.current && (
                  <div className="absolute inset-0 z-10 rounded-full bg-amber shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                    {!reducedMotion && <div className="absolute inset-0 animate-ping rounded-full bg-amber opacity-75" />}
                  </div>
                )}
              </div>

              {/* Left Column (Meta) */}
              <div className={`mb-4 w-full md:mb-0 md:w-[45%] ${i % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"}`}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-sm tracking-wide md:justify-end">
                    <span className="text-body font-bold">{job.version}</span>
                    <span className="text-muted">— {job.company}</span>
                    {job.current && (
                      <span className="rounded bg-amber/10 px-1.5 py-0.5 text-[10px] text-amber">
                        [current]
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-muted">
                    {job.date}
                  </div>
                </div>
              </div>

              {/* Right Column (Content) */}
              <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:text-left" : "md:order-1 md:text-right"}`}>
                <div className="mb-3 text-xl font-bold tracking-tight text-body">
                  {job.role}
                </div>
                <ul className="flex flex-col gap-2">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-0.5 font-mono text-emerald opacity-60">+</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
