// components/signup/RolePillsPhysics.tsx
"use client";

import React, { useEffect, useRef } from "react";

const ROLES = [
  "Founder",
  "Recruiter",
  "Team Lead",
  "HR Manager",
  "Hiring Manager",
  "Engineering Lead",
  "CTO",
  "VP of Product",
  "Head of Design",
  "Operations",
  "Growth Lead",
  "People Ops",
];

const PALETTES = [
  { bg: "#EEEDFE", border: "#534AB7", color: "#3C3489" },
  { bg: "#E1F5EE", border: "#0F6E56", color: "#085041" },
  { bg: "#FAECE7", border: "#993C1D", color: "#712B13" },
  { bg: "#FBEAF0", border: "#993556", color: "#72243E" },
  { bg: "#E6F1FB", border: "#185FA5", color: "#0C447C" },
  { bg: "#EAF3DE", border: "#3B6D11", color: "#27500A" },
  { bg: "#FAEEDA", border: "#854F0B", color: "#633806" },
  { bg: "#FCEBEB", border: "#A32D2D", color: "#791F1F" },
];

// ── Physics constants ──
const GRAVITY = 0.55;
const RESTITUTION = 0.18;
const AIR_FRICTION = 0.82;
const FLOOR_DAMP = 0.25;
const SLEEP_SPEED = 0.12;
const SLEEP_FRAMES = 18;
const OVERLAP_RATIO = 0.72;

interface Body {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  isDragging: boolean;
  sleeping: boolean;
  sleepCounter: number;
  samples: { x: number; y: number; t: number }[];
}

function rand(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function setPos(b: Body) {
  b.el.style.transform = `translate(${(b.x - b.w / 2) | 0}px,${(b.y - b.h / 2) | 0}px)`;
}

function resolveCollision(a: Body, b: Body) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const ra = ((a.w * OVERLAP_RATIO + a.h) / 2) * 0.5;
  const rb = ((b.w * OVERLAP_RATIO + b.h) / 2) * 0.5;
  const minD = ra + rb;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
  if (dist >= minD) return;

  const nx = dx / dist;
  const ny = dy / dist;
  const ov = minD - dist;

  if (a.sleeping && !b.isDragging) a.sleeping = false;
  if (b.sleeping && !a.isDragging) b.sleeping = false;

  const pushA = !a.isDragging && !a.sleeping ? 0.5 : 0;
  const pushB = !b.isDragging && !b.sleeping ? 0.5 : 0;
  const total = pushA + pushB || 1;

  if (!a.isDragging) {
    a.x -= nx * ov * (pushA / total);
    a.y -= ny * ov * (pushA / total);
  }
  if (!b.isDragging) {
    b.x += nx * ov * (pushB / total);
    b.y += ny * ov * (pushB / total);
  }

  const dvx = b.vx - a.vx;
  const dvy = b.vy - a.vy;
  const dot = dvx * nx + dvy * ny;
  if (dot > 0) return;

  const imp = dot * (1 + RESTITUTION) * 0.5;
  if (!a.isDragging && !a.sleeping) {
    a.vx += imp * nx;
    a.vy += imp * ny;
  }
  if (!b.isDragging && !b.sleeping) {
    b.vx -= imp * nx;
    b.vy -= imp * ny;
  }
}

function setupDrag(b: Body, stage: HTMLElement) {
  const getXY = (e: MouseEvent | TouchEvent) =>
    "touches" in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };

  const onDown = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    b.isDragging = true;
    b.sleeping = false;
    b.sleepCounter = 0;
    b.vx = 0;
    b.vy = 0;
    b.samples = [];
    b.el.style.zIndex = "100";
    b.el.style.cursor = "grabbing";

    const rect = stage.getBoundingClientRect();
    const start = getXY(e);
    const offX = b.x - (start.x - rect.left);
    const offY = b.y - (start.y - rect.top);

    const onMove = (ev: MouseEvent | TouchEvent) => {
      const p = getXY(ev);
      const sw = stage.offsetWidth;
      const sh = stage.offsetHeight;
      b.x = Math.max(b.w / 2, Math.min(sw - b.w / 2, p.x - rect.left + offX));
      b.y = Math.max(b.h / 2, Math.min(sh - b.h / 2, p.y - rect.top + offY));
      setPos(b);
      b.samples.push({ x: p.x, y: p.y, t: Date.now() });
      if (b.samples.length > 6) b.samples.shift();
    };

    const onUp = () => {
      b.isDragging = false;
      b.el.style.zIndex = "";
      b.el.style.cursor = "grab";

      if (b.samples.length >= 2) {
        const first = b.samples[0];
        const last = b.samples[b.samples.length - 1];
        const dt = Math.max((last.t - first.t) / 16, 1);
        b.vx = ((last.x - first.x) / dt) * 0.7;
        b.vy = ((last.y - first.y) / dt) * 0.7;
      }

      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend", onUp);
    };

    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove as EventListener, {
      passive: false,
    });
    window.addEventListener("touchend", onUp);
  };

  b.el.addEventListener("mousedown", onDown as EventListener);
  b.el.addEventListener("touchstart", onDown as EventListener, {
    passive: false,
  });
}

export default function RolePillsPhysics() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const bodies: Body[] = [];

    // ── Create pills ──
    ROLES.forEach((role, idx) => {
      const pal = PALETTES[idx % PALETTES.length];

      const el = document.createElement("div");
      el.textContent = role;

      Object.assign(el.style, {
        position: "absolute",
        padding: "8px 18px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: "500",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
        cursor: "grab",
        border: `0.5px solid ${pal.border}`,
        background: pal.bg,
        color: pal.color,
        userSelect: "none",
        willChange: "transform",
        left: "0px",
        top: "0px",
      });

      stage.appendChild(el);

      const pw = el.offsetWidth || 120;
      const ph = el.offsetHeight || 36;
      const sw = stage.offsetWidth;

      const body: Body = {
        el,
        x: rand(pw / 2, sw - pw / 2),
        y: ph / 2 + idx * 3,
        vx: rand(-1.2, 1.2),
        vy: rand(0, 0.5),
        w: pw,
        h: ph,
        isDragging: false,
        sleeping: false,
        sleepCounter: 0,
        samples: [],
      };

      setPos(body);
      bodies.push(body);
      setupDrag(body, stage);
    });

    // ── Physics loop ──
    // ✅ stage is captured in closure — always defined here
    function loop() {
      const sw = stage?.offsetWidth;
      const sh = stage?.offsetHeight;

      bodies.forEach((b) => {
        if (b.isDragging || b.sleeping) return;

        b.vy += GRAVITY;
        b.vx *= AIR_FRICTION;
        b.x += b.vx;
        b.y += b.vy;

        const hw = b.w / 2;
        const hh = b.h / 2;

        // floor
        if (b.y + hh >= sh!) {
          b.y = sh! - hh;
          b.vy = -Math.abs(b.vy) * RESTITUTION;
          b.vx *= FLOOR_DAMP;
          if (Math.abs(b.vy) < SLEEP_SPEED) b.vy = 0;
        }

        // ceiling
        if (b.y - hh <= 0) {
          b.y = hh;
          b.vy = Math.abs(b.vy) * RESTITUTION;
        }

        // walls
        if (b.x - hw <= 0) {
          b.x = hw;
          b.vx = Math.abs(b.vx) * RESTITUTION;
        }
        if (b.x + hw >= sw!) {
          b.x = sw! - hw;
          b.vx = -Math.abs(b.vx) * RESTITUTION;
        }

        // ── Sleep check ──
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed < SLEEP_SPEED) {
          b.sleepCounter++;
          if (b.sleepCounter >= SLEEP_FRAMES) {
            b.vx = 0;
            b.vy = 0;
            b.sleeping = true;
            b.sleepCounter = 0;
          }
        } else {
          b.sleepCounter = 0;
        }

        setPos(b);
      });

      // Multiple passes = stable stacking
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            resolveCollision(bodies[i], bodies[j]);
          }
        }
      }

      // Re-render sleeping pills pushed by collision
      bodies.forEach((b) => {
        if (b.sleeping) setPos(b);
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafRef.current);
      bodies.forEach((b) => b.el.remove());
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative w-full h-full overflow-hidden rounded-xl
                 bg-muted/40 border border-border"
      aria-label="Draggable role pills"
    >
      <p
        className="absolute top-3 left-1/2 -translate-x-1/2 text-xs
                    text-muted-foreground pointer-events-none whitespace-nowrap"
      >
        drag and throw the pills
      </p>
    </div>
  );
}
