"use client";

import { TECH } from "@/lib/data";
import { Icon } from "@/lib/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Registry() {
  const reducedMotion = useReducedMotion();
  const topRow = TECH.slice(0, Math.ceil(TECH.length / 2));
  const bottomRow = TECH.slice(Math.ceil(TECH.length / 2));

  const renderRow = (items: string[], reverse: boolean) => (
    <div className="group relative flex overflow-hidden w-full h-16 items-center border-y border-line bg-bg">
      <div 
        className={`flex w-max items-center ${reducedMotion ? '' : reverse ? 'animate-[marquee-reverse_34s_linear_infinite]' : 'animate-[marquee_40s_linear_infinite]'} group-hover:[animation-play-state:paused]`}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div 
            key={`${item}-${i}`} 
            className="flex items-center gap-3 px-8 text-muted transition-all duration-300 hover:scale-110 hover:text-cyan"
            aria-hidden={i >= items.length}
          >
            <Icon name={item} className="h-5 w-5" />
            <span className="font-mono text-sm uppercase tracking-wider">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="registry" className="w-full py-12">
      <div className="sr-only">
        <h2>Technology Stack Registry</h2>
        <ul>
          {TECH.map(t => <li key={t}>{t}</li>)}
        </ul>
      </div>
      
      <div className="flex flex-col gap-[1px] bg-line" aria-hidden="true">
        {renderRow(topRow, false)}
        {renderRow(bottomRow, true)}
      </div>
    </section>
  );
}
