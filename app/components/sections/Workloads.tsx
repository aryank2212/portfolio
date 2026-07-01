"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import { PROJECTS, Project } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Unique generative art per project theme ───────────────────────────

function SwarmArt() {
  const reducedMotion = useReducedMotion();
  return (
    <svg className="absolute inset-0 h-full w-full opacity-50 mix-blend-screen" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="swarmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="swarmLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#07080c" />
      {/* Drone swarm agents */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 50 + (i % 8) * 65 + Math.sin(i * 1.7) * 20;
        const y = 60 + Math.floor(i / 8) * 70 + Math.cos(i * 2.1) * 15;
        return (
          <g key={i} className={reducedMotion ? "" : "transition-transform duration-1000 group-hover:translate-y-[-4px]"}>
            <circle cx={x} cy={y} r="3" fill="#22d3ee" opacity={0.4 + (i % 3) * 0.2} />
            <circle cx={x} cy={y} r="8" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity={0.15} />
            {/* Connections between nearby agents */}
            {i < 20 && (
              <line
                x1={x} y1={y}
                x2={50 + ((i + 3) % 8) * 65 + Math.sin((i + 3) * 1.7) * 20}
                y2={60 + Math.floor((i + 3) / 8) * 70 + Math.cos((i + 3) * 2.1) * 15}
                stroke="#22d3ee" strokeWidth="0.3" opacity={0.12}
              />
            )}
          </g>
        );
      })}
      <circle cx="300" cy="150" r="80" fill="url(#swarmGlow)" />
    </svg>
  );
}

function OsintArt() {
  const reducedMotion = useReducedMotion();
  return (
    <svg className="absolute inset-0 h-full w-full opacity-45 mix-blend-screen" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <rect width="100%" height="100%" fill="#07080c" />
      {/* Data streams / scan lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <rect
          key={i}
          x={15 + (i % 4) * 45}
          y={15 + i * 14}
          width={30 + (i % 3) * 25}
          height="3"
          fill="#34d399"
          opacity={0.08 + (20 - i) / 30}
          rx="1.5"
          className={reducedMotion ? "" : "transition-all duration-700 group-hover:translate-x-2 group-hover:opacity-60"}
        />
      ))}
      {/* Eye / focus indicator */}
      <circle cx="100" cy="150" r="28" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.2" />
      <circle cx="100" cy="150" r="12" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.3" />
      <circle cx="100" cy="150" r="3" fill="#34d399" opacity="0.5" />
    </svg>
  );
}

function AgentArt() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-40 mix-blend-screen" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <rect width="100%" height="100%" fill="#07080c" />
      {/* Flow graph / decision tree */}
      <g stroke="#f59e0b" fill="none" strokeWidth="1" opacity="0.25">
        <rect x="80" y="20" width="40" height="24" rx="4" />
        <line x1="100" y1="44" x2="60" y2="70" />
        <line x1="100" y1="44" x2="140" y2="70" />
        <rect x="40" y="70" width="40" height="24" rx="4" />
        <rect x="120" y="70" width="40" height="24" rx="4" />
        <line x1="60" y1="94" x2="60" y2="120" />
        <line x1="140" y1="94" x2="140" y2="120" />
        <line x1="60" y1="94" x2="100" y2="120" />
        <rect x="40" y="120" width="40" height="24" rx="4" />
        <rect x="80" y="120" width="40" height="24" rx="4" />
        <rect x="120" y="120" width="40" height="24" rx="4" />
      </g>
      {/* Pulse nodes */}
      <circle cx="100" cy="32" r="3" fill="#f59e0b" opacity="0.5" />
      <circle cx="60" cy="82" r="3" fill="#f59e0b" opacity="0.4" />
      <circle cx="140" cy="82" r="3" fill="#f59e0b" opacity="0.4" />
    </svg>
  );
}

function SideProjectArt() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-35 mix-blend-screen" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <rect width="100%" height="100%" fill="#07080c" />
      {/* Terminal window / code block aesthetic */}
      <g opacity="0.3">
        <rect x="30" y="30" width="140" height="100" rx="6" fill="none" stroke="#ec4899" strokeWidth="1" />
        <line x1="30" y1="48" x2="170" y2="48" stroke="#ec4899" strokeWidth="0.5" opacity="0.5" />
        <circle cx="42" cy="39" r="3" fill="#ec4899" opacity="0.4" />
        <circle cx="52" cy="39" r="3" fill="#ec4899" opacity="0.3" />
        <circle cx="62" cy="39" r="3" fill="#ec4899" opacity="0.2" />
        {/* Code lines */}
        <rect x="40" y="58" width="60" height="3" rx="1.5" fill="#ec4899" opacity="0.25" />
        <rect x="40" y="68" width="90" height="3" rx="1.5" fill="#ec4899" opacity="0.2" />
        <rect x="50" y="78" width="50" height="3" rx="1.5" fill="#ec4899" opacity="0.15" />
        <rect x="50" y="88" width="70" height="3" rx="1.5" fill="#ec4899" opacity="0.2" />
        <rect x="40" y="98" width="40" height="3" rx="1.5" fill="#ec4899" opacity="0.15" />
      </g>
    </svg>
  );
}

// Map internalIds to art components
const ART_MAP: Record<string, React.ComponentType> = {
  streamline: SwarmArt,
  lens: OsintArt,
  devkit: AgentArt,
};

function getArtComponent(project: Project) {
  // RedClove uses devkit id but gets its own art
  if (project.title === "RedClove") return SideProjectArt;
  return ART_MAP[project.internalId] || AgentArt;
}

// ─── Project Card ──────────────────────────────────────────────────────

function ProjectCard({ project, className, delay = 0 }: { project: Project; className?: string; delay?: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  // Mouse glow follow
  useEffect(() => {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => card.removeEventListener("mousemove", onMouseMove);
  }, [reducedMotion]);

  // Entrance animation with IntersectionObserver
  useEffect(() => {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;

    card.style.opacity = "0";
    card.style.transform = "translateY(32px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.transition = "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [reducedMotion, delay]);

  const ArtComponent = getArtComponent(project);
  const isExternal = project.link !== "#";
  const isLive = project.link.startsWith("http") && !project.link.includes("github.com");

  return (
    <a
      ref={cardRef}
      href={isExternal ? project.link : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-cursor="hover"
      className={`group relative flex overflow-hidden rounded-xl border border-line/60 bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan/30 hover:shadow-[0_8px_40px_-12px_rgba(34,211,238,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${className ?? ""}`}
    >
      {/* Mouse-follow radial glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(34,211,238,0.08), transparent 40%)`
        }}
      />

      {/* Generative art background */}
      <div className="absolute inset-0 z-0">
        <ArtComponent />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg via-bg/85 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2.5 font-mono text-[10px] tracking-widest uppercase">
          <span className="text-cyan">{project.category}</span>
          <span className="text-line/60">·</span>
          <span className="text-emerald">{project.impact}</span>
          {isLive && (
            <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/5 px-2.5 py-0.5 text-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
              Live
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight text-body md:text-2xl">{project.title}</h3>
        <p className="mb-5 max-w-xl text-sm leading-relaxed text-muted line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 font-mono text-[10px] text-muted">
          {project.tags.map(tag => (
            <span key={tag} className="rounded border border-line/40 bg-bg/60 px-2 py-1 backdrop-blur-sm transition-colors group-hover:border-line/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

// ─── Bento Grid ────────────────────────────────────────────────────────

export default function Workloads() {
  const featured = PROJECTS.find(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section id="workloads" className="mx-auto w-full max-w-6xl px-4 py-32 md:px-8">
      <SectionHeader route="workloads" title="Selected Work" />

      {/* Asymmetric bento grid */}
      <div className="grid auto-rows-[minmax(200px,1fr)] grid-cols-1 gap-5 md:grid-cols-12">
        {/* KAAL — featured hero, full width */}
        {featured && (
          <ProjectCard
            project={featured}
            className="md:col-span-12 min-h-[340px] lg:min-h-[380px]"
            delay={0}
          />
        )}

        {/* Row 2: 3 cards in a 5-4-3 column split for visual rhythm */}
        {rest[0] && (
          <ProjectCard
            project={rest[0]}
            className="md:col-span-5 min-h-[300px]"
            delay={100}
          />
        )}
        {rest[1] && (
          <ProjectCard
            project={rest[1]}
            className="md:col-span-4 min-h-[300px]"
            delay={200}
          />
        )}
        {rest[2] && (
          <ProjectCard
            project={rest[2]}
            className="md:col-span-3 min-h-[300px]"
            delay={300}
          />
        )}
      </div>
    </section>
  );
}
