"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ParallaxTiltProps {
  children: React.ReactNode;
}

type ParallaxTiltMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function ParallaxTilt({
  children,
}: Readonly<ParallaxTiltProps>) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const onMouseMove = contextSafe((e: ParallaxTiltMouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    gsap.set(cardRef.current, { rotateZ: 6 });
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Convert to rotation values (tweak 15 to change intensity)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    const glint = card.querySelector(".glint");
    gsap.to(glint, {
      x: x - centerX,
      y: y - centerY,
      opacity: 1,
      duration: 0.2,
    });

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000, // Essential for 3D depth
    });
  });

  const onMouseLeave = contextSafe(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)", // Adds a nice "snap back" bounce
    });
  });

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative perspective-1000 w-full"
      style={{ transformStyle: "preserve-3d" }}
      //   className="transition-shadow relative perspective-1000 duration-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)] w-full"
    >
      {children}
    </div>
  );
}
