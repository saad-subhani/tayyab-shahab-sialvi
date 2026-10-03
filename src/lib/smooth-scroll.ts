"use client";

import type Lenis from "lenis";

/**
 * Tiny registry so client components (e.g. the full-screen menu) can drive the
 * single Lenis instance owned by <Providers /> instead of fighting it with
 * native scroll calls.
 */
let instance: Lenis | null = null;

export function registerLenis(next: Lenis | null) {
  instance = next;
}

/** Smooth-scroll to an element id, respecting reduced-motion preferences. */
export function scrollToId(id: string, offset = -8) {
  if (typeof document === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (instance && !reduced) {
    instance.scrollTo(el, { offset });
    return;
  }

  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
