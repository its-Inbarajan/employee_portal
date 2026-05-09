"use client";

import React from "react";

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

const GRAVITY = 0.45;
const RESTITUTION = 0.28;
const FRICTION = 0.78;
const FLOOR_DAMP = 0.35;
const MIN_SPEED = 0.08;

interface Body {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  isDragging: boolean;
  samples: { x: number; y: number; t: number }[];
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function RolePillsPhysics() {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const bodiesRef = React.useRef<Body[]>([]);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const bodies: Body[] = [];
    bodiesRef.current = bodies;

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
        y: ph / 2 + idx * 2,
        vx: rand(-1.5, 1.5),
        vy: rand(0, 1),
        w: pw,
        h: ph,
        isDragging: false,
        samples: [],
      };

      setPos(body);
      bodies.push(body);
      setupDrag(body, stage, bodies);
    });

    // ── Physics loop ──
    function loop() {
      const sw = stage.offsetWidth;
      const sh = stage.offsetHeight;

      bodies.forEach((b) => {
        if (b.isDragging) return;

        b.vy += GRAVITY;
        b.vx *= FRICTION;
        b.x += b.vx;
        b.y += b.vy;

        const hw = b.w / 2,
          hh = b.h / 2;

        // floor
        if (b.y + hh >= sh) {
          b.y = sh - hh;
          b.vy = -Math.abs(b.vy) * RESTITUTION;
          b.vx *= FLOOR_DAMP;
          if (Math.abs(b.vy) < MIN_SPEED) b.vy = 0;
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
        if (b.x + hw >= sw) {
          b.x = sw - hw;
          b.vx = -Math.abs(b.vx) * RESTITUTION;
        }

        if (b.y + hh >= sh - 1 && Math.abs(b.vx) < MIN_SPEED) b.vx = 0;

        setPos(b);
      });

      // collisions
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          resolveCollision(bodies[i], bodies[j]);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      // Clean up DOM pills
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

// ─────────────────────────────────────────
// HELPERS — defined outside component
// so they don't recreate on every render
// ─────────────────────────────────────────

function setPos(b: Body) {
  b.el.style.transform = `translate(${Math.round(b.x - b.w / 2)}px,${Math.round(b.y - b.h / 2)}px)`;
}

function resolveCollision(a: Body, b: Body) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const minD = ((a.w + b.w) / 2) * 0.82;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
  if (dist >= minD) return;

  const nx = dx / dist;
  const ny = dy / dist;
  const ov = minD - dist;

  if (!a.isDragging) {
    a.x -= nx * ov * 0.5;
    a.y -= ny * ov * 0.5;
  }
  if (!b.isDragging) {
    b.x += nx * ov * 0.5;
    b.y += ny * ov * 0.5;
  }

  const dvx = b.vx - a.vx;
  const dvy = b.vy - a.vy;
  const dot = dvx * nx + dvy * ny;
  if (dot > 0) return;

  const imp = dot * (1 + RESTITUTION) * 0.5;
  if (!a.isDragging) {
    a.vx += imp * nx;
    a.vy += imp * ny;
  }
  if (!b.isDragging) {
    b.vx -= imp * nx;
    b.vy -= imp * ny;
  }
}

function setupDrag(b: Body, stage: HTMLElement, bodies: Body[]) {
  const getXY = (e: MouseEvent | TouchEvent) =>
    "touches" in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };

  const onDown = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    b.isDragging = true;
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
      const sw = stage.offsetWidth,
        sh = stage.offsetHeight;
      const hw = b.w / 2,
        hh = b.h / 2;
      b.x = Math.max(hw, Math.min(sw - hw, p.x - rect.left + offX));
      b.y = Math.max(hh, Math.min(sh - hh, p.y - rect.top + offY));
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
