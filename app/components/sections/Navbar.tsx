"use client";

import { useEffect, useState, useRef } from "react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Navbar() {
  const [active, setActive] = useState(NAV_LINKS[0].id);
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Reveal/hide logic
      if (currentScroll > 100) {
        if (currentScroll > lastScroll.current && !mobileOpen) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      lastScroll.current = currentScroll;

      // Active section logic (35% from top)
      const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
      const threshold = window.innerHeight * 0.35;
      
      // Check if at bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActive(NAV_LINKS[NAV_LINKS.length - 1].id);
        return;
      }

      let currentActive = active;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const rect = sec.getBoundingClientRect();
        if (rect.top <= threshold) {
          currentActive = sec.id;
          break;
        }
      }
      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active, mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-0 right-0 top-6 z-50 mx-auto max-w-fit px-4"
      >
        <nav className="glass flex h-12 items-center gap-2 rounded-full px-4 pr-2 shadow-2xl transition-all">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
            className="group flex h-8 w-8 items-center justify-center rounded-full bg-line text-cyan transition-colors hover:bg-cyan/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-label="Back to top"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>

          <div className="mx-2 h-4 w-px bg-line" />

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                  className={`relative px-4 py-1.5 font-mono text-xs font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                    active === link.id ? "text-cyan" : "text-muted hover:text-body"
                  }`}
                >
                  {active === link.id && !reducedMotion && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-line"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex pl-2 border-l border-line ml-2">
            <button
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="flex h-8 items-center justify-center rounded-full px-3 font-mono text-xs text-muted hover:bg-line hover:text-body focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              aria-label="Open Command Palette"
            >
              ⌘K
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="ml-auto flex h-8 w-8 items-center justify-center text-muted hover:text-body md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-label="Open Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </nav>
      </motion.header>

      <MobileMenu 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        activeId={active}
        onNavigate={scrollTo}
      />
    </>
  );
}
