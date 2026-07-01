"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const runCommand = (cmd: string) => {
    setOpen(false);
    if (cmd.startsWith("section:")) {
      const id = cmd.split(":")[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === "email") {
      navigator.clipboard.writeText("hello@aryanrajput.dev");
      alert("Email copied to clipboard");
    } else if (cmd === "uptime") {
      alert("Uptime: 2,341 days since career start. 0 burnout incidents.");
    } else if (cmd === "hire") {
      const el = document.getElementById("connect");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const contactSection = document.getElementById("connect");
        if (contactSection) {
          contactSection.style.boxShadow = "inset 0 0 100px rgba(245, 158, 11, 0.2)";
          setTimeout(() => (contactSection.style.boxShadow = ""), 2000);
        }
      }, 500);
    }
  };

  const commands = [
    { id: "section:workloads", label: "Go to Workloads" },
    { id: "section:runtime", label: "Go to Runtime (About)" },
    { id: "section:changelog", label: "Go to Changelog" },
    { id: "section:docs", label: "Go to Docs" },
    { id: "section:connect", label: "Go to Connect" },
    { id: "email", label: "Copy Email Address" },
    { id: "resume", label: "Download Résumé" },
    { id: "uptime", label: "> uptime" },
    { id: "hire", label: "> sudo hire aryan" },
  ].filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" role="dialog" aria-modal="true">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm" 
            inert={true}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
          >
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent p-4 font-mono text-sm text-body outline-none placeholder:text-muted"
            />
            <div className="h-px bg-line" />
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {commands.length === 0 ? (
                <div className="p-4 text-center font-mono text-xs text-muted">No results found.</div>
              ) : (
                commands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => runCommand(cmd.id)}
                    className="flex w-full items-center rounded-lg p-3 text-left font-mono text-xs text-muted transition-colors hover:bg-line hover:text-cyan focus:bg-line focus:text-cyan focus:outline-none"
                  >
                    {cmd.label}
                  </button>
                ))
              )}
            </div>
            <div className="flex items-center justify-between border-t border-line bg-bg p-3 font-mono text-[10px] text-muted">
              <span>sys.palette</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
