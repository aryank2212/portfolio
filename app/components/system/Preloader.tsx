"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("visited")) {
      setDone(true);
      onComplete();
      return;
    }

    const steps = [
      "▸ resolving fonts … ok 42ms",
      "▸ compiling shaders … ok",
      "▸ establishing session … ok",
      "▸ ready"
    ];

    let currentMsg = 0;
    const msgInterval = setInterval(() => {
      if (currentMsg < steps.length) {
        setMessages(m => [...m, steps[currentMsg]]);
        currentMsg++;
      }
    }, 150);

    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + Math.random() * 18 + 8, 100);
      setProgress(Math.floor(current));
      
      const fontsReady = document.fonts ? document.fonts.status === "loaded" : true;
      
      if (current >= 100 && currentMsg >= steps.length && fontsReady) {
        clearInterval(interval);
        clearInterval(msgInterval);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("visited", "true");
          onComplete();
        }, 300);
      }
    }, 60);

    // Hard cap 2.5s
    const timeout = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("visited", "true");
      onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          aria-hidden
        >
          <div className="w-64 space-y-4">
            <div className="flex flex-col gap-1 font-mono text-xs text-muted">
              {messages.map((m, i) => (
                <div key={i}>{m}</div>
              ))}
            </div>
            <div className="h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
