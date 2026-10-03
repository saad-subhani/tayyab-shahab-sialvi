"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { nav } from "@/content/site";
import { scrollToId } from "@/lib/smooth-scroll";
import { GENERAL_ENQUIRY, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function MenuOverlay({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="grain fixed inset-0 z-[60] overflow-y-auto bg-ink text-ivory"
        >
          <div className="relative mx-auto flex min-h-full max-w-7xl flex-col px-6 py-8 md:px-10">
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl leading-none">
                TS<span className="text-gold">.</span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-gold"
              >
                Close <X className="size-4" strokeWidth={1.25} />
              </button>
            </div>

            <ol className="my-auto py-12">
              {nav.map((item, i) => (
                <li key={item.id} className="border-b border-ivory/10">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      requestAnimationFrame(() => scrollToId(item.id));
                    }}
                    aria-current={active === item.id ? "true" : undefined}
                    className="group flex items-baseline gap-6 py-4 md:py-5"
                  >
                    <span className="w-8 text-xs tracking-[0.2em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-display-lg transition-all duration-500 group-hover:translate-x-3 group-hover:text-gold",
                        active === item.id && "text-gold",
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 pt-6 text-[11px] uppercase tracking-[0.16em] text-ivory/50">
              <span>Official Personal • Professional • Social</span>
              <a
                href={waLink(GENERAL_ENQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold transition-colors hover:text-ivory"
              >
                WhatsApp →
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
