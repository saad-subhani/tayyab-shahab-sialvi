"use client";

import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { useEffect } from "react";

import { registerLenis } from "@/lib/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      anchors: true,
      touchMultiplier: 1.6,
    });
    registerLenis(lenis);

    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
