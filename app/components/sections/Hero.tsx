"use client";

import { COPY } from "@/lib/copy";
import PacketField from "./PacketField";

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] w-full items-center px-4 md:px-8 xl:px-16 overflow-hidden">
      <PacketField />
      
      <div className="relative z-10 w-full max-w-5xl pt-20">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-2 w-2 items-center justify-center rounded-full bg-amber shadow-[0_0_8px_rgba(245,158,11,0.6)]">
            <div className="h-2 w-2 animate-ping rounded-full bg-amber opacity-75" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {COPY.hero.badge}
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.9]">
          {COPY.hero.h1[0]}
          <br />
          {COPY.hero.h1[1]}
          <span className="text-shine inline-block">{COPY.hero.h1[2]}</span>
          {COPY.hero.h1[3]}
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl leading-relaxed">
          {COPY.hero.sub}
        </p>
      </div>
    </section>
  );
}
