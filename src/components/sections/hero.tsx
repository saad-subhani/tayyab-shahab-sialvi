"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

import { ActionLink } from "@/components/shared/action-link";
import { site } from "@/content/site";
import { GENERAL_ENQUIRY, waLink } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="grain relative isolate flex min-h-svh overflow-hidden bg-ink text-ivory"
    >
      {/* ── Large portrait ── */}
      <div className="absolute inset-y-0 right-0 w-full opacity-45 md:w-[62%] md:opacity-100">
        {/* soft separation glow so the cut-out never sinks into the ink */}
        <div className="absolute inset-0 bg-[radial-gradient(56%_44%_at_56%_30%,rgba(245,242,236,0.10),transparent_72%)]" />
        <Image
          src={site.heroImage}
          alt={site.heroAlt}
          fill
          priority
          sizes="(min-width: 768px) 62vw, 100vw"
          unoptimized={site.heroImage.endsWith(".svg")}
          className="object-cover object-top"
        />
        {/* blend the portrait into the ink background */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent md:via-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      </div>

      {/* ── Copy ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-gold"
        >
          <span className="h-px w-12 bg-gold/70" />
          Official Personal • Professional • Social
        </motion.p>

        <h1 className="font-display text-display-xl font-medium leading-[0.98] tracking-[-0.015em]">
          {site.nameLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-9 flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 text-[13px] uppercase tracking-[0.14em] text-ivory/80"
        >
          {site.identity.map((item, i) => (
            <li key={item} className="flex items-center gap-5">
              {item}
              {i < site.identity.length - 1 && (
                <span aria-hidden className="hidden h-3 w-px bg-ivory/30 sm:block" />
              )}
            </li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="mt-7 max-w-xl text-[17px] leading-relaxed text-ivory/70"
        >
          {site.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <ActionLink
            variant="solid"
            action={{
              label: "Message on WhatsApp",
              href: waLink(GENERAL_ENQUIRY),
              kind: "whatsapp",
              external: true,
            }}
          />
          <ActionLink
            variant="outline"
            icon={false}
            action={{ label: "Explore Profile", href: "#about", kind: "other", external: false }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex items-end justify-between gap-8 border-t border-ivory/10 pt-6"
        >
          {site.location ? (
            <p className="text-[11px] uppercase tracking-[0.18em] text-ivory/50">
              {site.location}
            </p>
          ) : (
            <span aria-hidden />
          )}

          <a
            href="#snapshot"
            aria-label="Scroll down"
            className="group hidden items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ivory/50 transition-colors hover:text-gold md:flex"
          >
            Scroll
            <ArrowDown
              className="size-4 transition-transform duration-500 group-hover:translate-y-1"
              strokeWidth={1.25}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
