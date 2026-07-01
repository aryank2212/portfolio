import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  variant?: "primary" | "glass" | "white";
  children: ReactNode;
  className?: string;
}

const variants = {
  primary:
    "bg-accent text-white shadow-[0_0_40px_rgba(99,102,241,0.45)] hover:bg-accent-soft hover:text-bg hover:shadow-[0_0_60px_rgba(99,102,241,0.6)]",
  glass: "glass hover:border-white/20",
  white:
    "bg-white text-black hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]",
};

export default function Button({ href, variant = "primary", children, className }: ButtonProps) {
  return (
    <a
      href={href}
      data-cursor
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5",
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  );
}