"use client";

import { useState, useRef, useEffect } from "react";
import SectionHeader from "../ui/SectionHeader";
import { TERMINAL_LINES, FACTS } from "@/lib/data";
import { COPY } from "@/lib/copy";

function Terminal() {
  const [history, setHistory] = useState<{ type: "input" | "output"; text: string }[]>(
    TERMINAL_LINES.map((l, i) => ({ type: i % 2 === 0 ? "input" : "output", text: l }))
  );
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "input" as const, text: `$ ${cmd}` }];

    if (cmd === "help") {
      newHistory.push({ type: "output", text: "available commands: whoami, stack, values, contact, clear" });
    } else if (cmd === "stack") {
      newHistory.push({ type: "output", text: "ml: python, pytorch, tensorflow, scikit-learn, hugging face, langchain // data: numpy, pandas, opencv // systems: c, c++, linux, git, bash // web: typescript, node.js, react, next.js" });
    } else if (cmd === "values" || cmd === "cat values.txt") {
      newHistory.push({ type: "output", text: "ownership · craft · empathy · ship-it energy" });
    } else if (cmd === "whoami") {
      newHistory.push({ type: "output", text: "aryan — engineer, systems thinker, relentless simplifier" });
    } else if (cmd === "contact") {
      newHistory.push({ type: "output", text: "initiating contact sequence... scroll down to /sys/connect" });
      setTimeout(() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" }), 1000);
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      newHistory.push({ type: "output", text: `command not found: ${cmd} — try 'help'` });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="flex h-96 w-full flex-col overflow-hidden rounded-xl border border-line bg-[#0a0c10] shadow-2xl">
      <div className="flex h-8 items-center gap-2 border-b border-line bg-surface px-4">
        <div className="h-3 w-3 rounded-full bg-line/50" />
        <div className="h-3 w-3 rounded-full bg-line/50" />
        <div className="h-3 w-3 rounded-full bg-line/50" />
        <div className="ml-2 font-mono text-[10px] tracking-widest text-muted">guest@aryan-sys:~</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-loose" data-cursor="text">
        {history.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-cyan" : "text-muted mb-4"}>
            {line.text}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center text-cyan">
          <span className="mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal Input"
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default function Runtime() {
  return (
    <section id="runtime" className="mx-auto w-full max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader route="runtime" title="About" />
      
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Terminal />
        </div>
        
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="mb-6 text-2xl font-bold tracking-tight text-body">
            {COPY.about.opener}
          </h3>
          <div className="space-y-6 text-muted">
            <p>
              I spend most of my time thinking about how systems fail, because understanding failure is the only way to build resilience. For the past six years, I've been designing distributed pipelines, migrating legacy monoliths, and building developer tools that don't make you want to throw your keyboard out the window.
            </p>
            <p>
              I believe in the power of good abstractions, rigorous testing, and deleting code. A lot of code. The best system is the one you don't have to maintain.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FACTS.map(f => (
              <div key={f.label} className="flex flex-col gap-1 border-l border-cyan/30 pl-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                  {f.label}
                </span>
                <span className="font-mono text-sm text-body">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
