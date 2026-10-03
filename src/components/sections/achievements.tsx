import { Counter } from "@/components/shared/counter";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { achievements } from "@/content/site";

export function Achievements() {
  return (
    <Section id="achievements" tone="ink" grain>
      <SectionHeading
        index="06"
        eyebrow="Milestones"
        title="Achievements & Milestones"
      />

      <div className="grid gap-px overflow-hidden bg-ivory/10 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.08} className="bg-ink">
            <div className="flex h-full min-h-[15rem] flex-col justify-between gap-10 p-8 md:p-12">
              {a.value !== undefined ? (
                <p className="font-display text-display-number leading-none text-gold">
                  <Counter to={a.value} suffix={a.suffix} />
                </p>
              ) : (
                /* no documented figure → a quiet gold rule reads as
                   intentional, where a 60px em-dash read as a bug. */
                <span aria-hidden className="h-px w-14 bg-gold/70" />
              )}
              <div>
                <p className="font-display text-display-md leading-tight text-balance">
                  {a.label}
                </p>
                {a.note && <p className="mt-3 text-sm text-ivory/50">{a.note}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
