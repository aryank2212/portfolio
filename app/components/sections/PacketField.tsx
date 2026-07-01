"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function PacketField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const NODES = 50;
    const DISTANCE_THRESH = 220;
    
    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      baseX: number; baseY: number;
      isYou: boolean;
      pulse: number;
    }

    interface Packet {
      from: Node; to: Node;
      progress: number; speed: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < NODES; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0, isYou: i === 0, pulse: 0 });
    }
    
    // Position 'you' node near center-right
    nodes[0].baseX = width * 0.7;
    nodes[0].baseY = height * 0.4;
    nodes[0].x = nodes[0].baseX;
    nodes[0].y = nodes[0].baseY;

    let packets: Packet[] = [];
    
    let mouse = { x: -1000, y: -1000 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
    });

    let clickWave = { x: -1000, y: -1000, radius: 0, active: false };
    window.addEventListener("click", (e) => {
      clickWave = { x: e.clientX, y: e.clientY, radius: 0, active: true };
    });

    let scrollFactor = 1;
    window.addEventListener("scroll", () => {
      scrollFactor = Math.max(0.1, 1 - window.scrollY / (height * 0.8));
    }, { passive: true });

    let rafId: number;
    const render = () => {
      ctx.fillStyle = "#07080c";
      ctx.fillRect(0, 0, width, height);

      // Scroll scaling
      ctx.save();
      ctx.translate(width/2, height/2);
      const scale = 0.8 + 0.2 * scrollFactor;
      ctx.scale(scale, scale);
      ctx.translate(-width/2, -height/2);

      // Handle Click Wave
      if (clickWave.active) {
        clickWave.radius += 15;
        if (clickWave.radius > Math.max(width, height)) clickWave.active = false;
        
        ctx.beginPath();
        ctx.arc(clickWave.x, clickWave.y, clickWave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0, 0.5 - clickWave.radius/1500)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        nodes.forEach(n => {
          const dx = n.x - clickWave.x;
          const dy = n.y - clickWave.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (Math.abs(dist - clickWave.radius) < 20) {
            n.pulse = 1;
          }
        });
      }

      // Physics
      nodes.forEach(n => {
        // Gravity to mouse
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 160) {
          n.vx += dx * 0.002;
          n.vy += dy * 0.002;
        }

        // Spring to base
        n.vx += (n.baseX - n.x) * 0.02;
        n.vy += (n.baseY - n.y) * 0.02;

        n.vx *= 0.92; // Damping
        n.vy *= 0.92;

        n.x += n.vx;
        n.y += n.vy;
        
        n.pulse = Math.max(0, n.pulse - 0.02);
      });

      // Edges & Packets Logic
      ctx.lineWidth = 1;
      const connections: [Node, Node][] = [];
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < DISTANCE_THRESH) {
            connections.push([nodes[i], nodes[j]]);
            const alpha = (1 - dist / DISTANCE_THRESH) * 0.15 * scrollFactor;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Spawn packets
      if (Math.random() < 0.1 * scrollFactor && connections.length > 0) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        packets.push({
          from: Math.random() > 0.5 ? conn[0] : conn[1],
          to: Math.random() > 0.5 ? conn[1] : conn[0],
          progress: 0,
          speed: 0.01 + Math.random() * 0.02
        });
      }

      // Draw Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }
        
        // Ease in out
        const t = p.progress;
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const x = p.from.x + (p.to.x - p.from.x) * ease;
        const y = p.from.y + (p.to.y - p.from.y) * ease;

        // Brighten if near mouse
        const mdx = mouse.x - x;
        const mdy = mouse.y - y;
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy);
        const nearMouse = mdist < 100;

        ctx.fillStyle = nearMouse ? "#34d399" : "#22d3ee";
        const pAlpha = scrollFactor * (nearMouse ? 1 : 0.6);
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nearMouse ? '52, 211, 153' : '34, 211, 238'}, ${pAlpha})`;
        ctx.fill();
      }

      // Draw Nodes
      nodes.forEach(n => {
        ctx.beginPath();
        const r = n.isYou ? 6 : 2 + n.pulse * 3;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        const alpha = (0.3 + n.pulse * 0.5) * scrollFactor;
        ctx.fillStyle = n.isYou ? `rgba(245, 158, 11, ${alpha + 0.2})` : `rgba(34, 211, 238, ${alpha})`;
        ctx.fill();

        if (n.isYou) {
          ctx.font = "10px monospace";
          ctx.fillStyle = `rgba(245, 158, 11, ${scrollFactor})`;
          ctx.fillText("you", n.x + 12, n.y + 3);
        }
      });

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none absolute inset-0 -z-10" 
      aria-hidden="true"
    />
  );
}
