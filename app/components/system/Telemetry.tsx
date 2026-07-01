"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Telemetry() {
  const reducedMotion = useReducedMotion();
  const [metrics, setMetrics] = useState({ p99: 4.2, reqs: 1847203, uptime: 99.99 });

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setMetrics((m) => ({
        p99: +(m.p99 + (Math.random() * 0.4 - 0.2)).toFixed(1),
        reqs: m.reqs + Math.floor(Math.random() * 15 - 5),
        uptime: m.uptime
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-line bg-surface/80 px-4 py-1.5 backdrop-blur-md md:flex justify-between items-center font-mono text-[10px] text-emerald tracking-widest uppercase">
      <div>sys.telemetry // active</div>
      <div className="flex gap-6">
        <span>p99 {metrics.p99}ms</span>
        <span>{metrics.reqs.toLocaleString()} req/s</span>
        <span>0 errors</span>
        <span>uptime {metrics.uptime}%</span>
      </div>
    </div>
  );
}
