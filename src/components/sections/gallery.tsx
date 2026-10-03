"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { gallery, galleryCategories } from "@/content/site";
import type { GalleryCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const ratios = ["aspect-4/5", "aspect-square", "aspect-4/3", "aspect-3/4"];

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [index, setIndex] = useState(-1);

  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  const slides = useMemo(
    () =>
      items
        .filter((i) => i.src)
        .map((i) => ({ src: i.src as string, alt: i.alt ?? i.caption })),
    [items],
  );

  return (
    <Section id="gallery" tone="sand">
      <SectionHeading
        index="08"
        eyebrow="Media & Gallery"
        title="Moments, press & milestones"
      />

      <div
        className="mb-12 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter gallery by category"
      >
        {(["All", ...galleryCategories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => {
              setFilter(c);
              setIndex(-1);
            }}
            className={cn(
              "rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
              filter === c
                ? "border-ink bg-ink text-ivory"
                : "border-line hover:border-gold hover:text-gold",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((g, i) => {
          // index of this item within the filtered "real photo" slides
          const slideIndex = g.src ? items.slice(0, i).filter((x) => x.src).length : -1;

          return (
            <figure key={g.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                disabled={!g.src}
                onClick={() => slideIndex >= 0 && setIndex(slideIndex)}
                className={cn(
                  "group relative block w-full overflow-hidden border border-line bg-ivory transition-colors duration-500",
                  ratios[i % ratios.length],
                  g.src ? "cursor-zoom-in hover:border-gold" : "cursor-default",
                )}
                aria-label={g.src ? `Open ${g.caption}` : `${g.caption} (photo coming soon)`}
              >
                {g.src ? (
                  <Image
                    src={g.src}
                    alt={g.alt ?? g.caption}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-stone">
                    <ImageIcon className="size-6" strokeWidth={1} />
                    <span className="text-[10px] uppercase tracking-[0.3em]">
                      Photo coming soon
                    </span>
                  </span>
                )}
              </button>

              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
                <span>{g.caption}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-gold">
                  {g.category}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(11, 11, 12, 0.96)" } }}
      />
    </Section>
  );
}
