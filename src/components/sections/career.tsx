import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { career } from "@/content/site";

/**
 * Status is grouped into blocks rather than repeated on every row — three
 * stacked "Former" labels read as noise instead of information.
 */
const groups = [
  { label: "Current", items: career.filter((c) => !c.former) },
  { label: "Previous roles", items: career.filter((c) => c.former) },
];

export function Career() {
  return (
    <Section id="career" tone="ink" grain>
      <SectionHeading
        index="03"
        eyebrow="Professional Journey"
        title="Professional Career"
      />

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="mb-9 text-xs uppercase tracking-[0.18em] text-gold">
              {g.label}
            </p>

            <ol className="relative ml-2 border-l border-ivory/15 pl-8 md:pl-10">
              {g.items.map((c, i) => (
                <Reveal
                  key={c.org}
                  as="li"
                  delay={i * 0.08}
                  className="relative pb-10 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="absolute -left-[37px] top-3 size-2.5 rounded-full bg-gold md:-left-[45px]"
                  />
                  <h3 className="font-display text-display-md leading-tight">
                    {c.role}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ivory/60">
                    {c.org}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}
