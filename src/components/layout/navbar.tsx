"use client";

import { useEffect, useRef, useState } from "react";

import { nav } from "@/content/site";
import { scrollToId } from "@/lib/smooth-scroll";
import { GENERAL_ENQUIRY, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { MenuOverlay } from "./menu-overlay";

const NAV_IDS = nav.map((n) => n.id) as readonly string[];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const measure = () => {
      ticking.current = false;
      const y = window.scrollY;
      setScrolled(y > 40);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);

      // scroll-spy: last section whose top has crossed 40% of the viewport
      let current = NAV_IDS[0];
      for (const id of NAV_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-ivory transition-all duration-500",
          scrolled
            ? "border-b border-ivory/10 bg-ink/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a
            href="#home"
            onClick={(e) => navigate(e, "home")}
            className="group flex items-baseline gap-4"
            aria-label="Back to top"
          >
            <span className="font-display text-2xl leading-none">
              TS<span className="text-gold">.</span>
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-ivory/70 transition-colors group-hover:text-ivory sm:inline">
              Tayyab Shahab Sialvi
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href={waLink(GENERAL_ENQUIRY)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-ivory/30 px-5 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-gold hover:text-gold sm:inline-block"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-gold"
            >
              Menu
              <span className="flex flex-col gap-[3px]" aria-hidden>
                <span className="block h-px w-4 bg-current transition-transform duration-300 group-hover:translate-x-1" />
                <span className="block h-px w-4 bg-current transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>

        {/* reading-progress hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold/70 transition-opacity duration-500"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
      </header>

      <MenuOverlay open={open} active={active} onClose={() => setOpen(false)} />
    </>
  );
}
