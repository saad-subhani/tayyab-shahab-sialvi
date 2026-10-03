import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { about } from "@/content/site";

export function About() {
  return (
    <Section id="about" tone="sand">
      <SectionHeading index="01" eyebrow="About" title="Profile" />

      <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="font-display text-display-md leading-snug text-balance">
            {about.body}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 className="mb-6 text-xs uppercase tracking-[0.18em] text-gold">
            Education
          </h3>
          <ul className="divide-y divide-line border-y border-line">
            {about.education.map((e) => (
              <li key={e.title} className="py-6">
                <p className="font-display text-display-sm leading-snug">{e.title}</p>
                <p className="mt-1 text-stone">{e.institution}</p>
                {e.period && (
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gold">
                    {e.period}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
