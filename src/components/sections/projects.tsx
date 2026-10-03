"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ActionLink } from "@/components/shared/action-link";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/content/site";
import { getActions } from "@/lib/actions";

export function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const embla = emblaApi;
    if (!embla) return;

    // sync only from Embla's own event callbacks (never during the effect body)
    const onChange = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };

    onChange();
    embla.on("init", onChange);
    embla.on("select", onChange);
    embla.on("reInit", onChange);

    return () => {
      embla.off("init", onChange);
      embla.off("select", onChange);
      embla.off("reInit", onChange);
    };
  }, [emblaApi]);

  return (
    <Section id="projects" tone="sand">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          index="05"
          eyebrow="Projects"
          title="Current & Featured Projects"
          description="Drag to explore."
          className="mb-0"
        />

        <div className="mb-12 hidden gap-2 md:mb-16 md:flex">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous projects"
            className="flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next projects"
            className="flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={emblaRef}
        data-lenis-prevent
        className="embla -mx-6 px-6 md:-mx-10 md:px-10"
      >
        <div className="embla__container gap-6">
          {projects.map((p) => {
            const actions = getActions(
              p.links,
              p.waMessage,
              p.status === "Coming Soon" ? "Get notified" : "Enquire on WhatsApp",
            );

            return (
              <article
                key={p.id}
                className="embla__slide flex min-h-[26rem] flex-[0_0_85%] flex-col justify-between border border-line bg-ivory p-8 md:flex-[0_0_42%] md:p-10 lg:flex-[0_0_31%]"
              >
                <div>
                  <Badge
                    variant="gold"
                    className={p.status === "Coming Soon" ? "opacity-60" : undefined}
                  >
                    {p.status}
                  </Badge>
                  <h3 className="mt-6 font-display text-display-md leading-tight text-balance">
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="mt-4 leading-relaxed text-stone">{p.description}</p>
                  )}

                  <dl className="mt-8 space-y-3 text-sm">
                    {p.role && (
                      <div className="flex gap-3">
                        <dt className="w-16 shrink-0 text-xs uppercase tracking-[0.14em] text-stone">
                          Role
                        </dt>
                        <dd>{p.role}</dd>
                      </div>
                    )}
                    {p.partners.length > 0 && (
                      <div className="flex gap-3">
                        <dt className="w-16 shrink-0 text-xs uppercase tracking-[0.14em] text-stone">
                          Partners
                        </dt>
                        <dd>{p.partners.join(" + ")}</dd>
                      </div>
                    )}
                    {p.hasGallery && (
                      <div className="flex gap-3">
                        <dt className="w-16 shrink-0 text-xs uppercase tracking-[0.14em] text-stone">
                          Gallery
                        </dt>
                        <dd>
                          <a href="#gallery" className="text-gold hover:underline">
                            Available
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {actions.map((a) => (
                    <ActionLink key={a.href + a.label} action={a} variant="solid" />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
