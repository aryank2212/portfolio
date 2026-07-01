"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeId: string;
  onNavigate: (id: string) => void;
}

export default function MobileMenu({ isOpen, onClose, activeId, onNavigate }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const firstLink = menuRef.current?.querySelector("a") as HTMLAnchorElement;
      firstLink?.focus();
    } else {
      document.body.style.overflow = "";
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/95 backdrop-blur-md"
            inert={true}
          />
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs border-l border-line bg-surface p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line pb-6">
              <span className="font-mono text-sm text-cyan">{SITE.initials} // sys.menu</span>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-line text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="mt-8 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}
                    className={`block font-mono text-xl tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                      activeId === link.id ? "text-cyan" : "text-body hover:text-cyan"
                    }`}
                  >
                    /sys/{link.id}
                    <span className="block mt-1 font-sans text-xs text-muted uppercase tracking-widest">{link.title}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
