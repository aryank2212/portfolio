"use client";

import { useState } from "react";
import { SITE } from "@/lib/data";
import { COPY } from "@/lib/copy";

export default function Connect() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="connect" className="mx-auto w-full max-w-5xl px-4 py-32 md:px-8 transition-shadow duration-1000 rounded-3xl">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-line" />
          <span className="font-mono text-sm tracking-widest text-cyan">/sys/connect</span>
          <div className="h-[1px] w-8 bg-line" />
        </div>
        
        <h2 className="mb-12 max-w-2xl text-4xl font-bold tracking-tighter md:text-6xl">
          {COPY.contact.h2}
        </h2>
        
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <button
            onClick={copyEmail}
            className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-lg bg-amber px-8 font-mono text-sm font-bold text-[#000] transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span className="relative z-10 flex items-center gap-2">
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  COPIED
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  COPY EMAIL
                </>
              )}
            </span>
            <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center rounded-lg border border-line bg-surface px-8 font-mono text-sm font-bold text-body transition-colors hover:border-cyan hover:text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            BOOK CALENDLY
          </a>
        </div>
      </div>
    </section>
  );
}
