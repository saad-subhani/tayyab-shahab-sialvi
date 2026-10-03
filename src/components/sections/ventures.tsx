import { ActionLink } from "@/components/shared/action-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ventures } from "@/content/site";
import { getActions } from "@/lib/actions";
import { cn } from "@/lib/utils";

/** Case- and punctuation-insensitive comparison of card copy. */
const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

export function Ventures() {
  return (
    <Section id="ventures" tone="ivory">
      <SectionHeading
        index="04"
        eyebrow="Businesses & Ventures"
        title="Building across industries"
      />

      <div className="grid gap-px overflow-hidden bg-line md:grid-cols-2 lg:grid-cols-3">
        {ventures.map((v, i) => {
          const actions = getActions(v.links, v.waMessage, `Enquire about ${v.name}`);
          const desc = normalise(v.description);

          // Skip copy that only echoes the card title, e.g.
          // "Consulting / Business Development Services" repeating itself.
          const showDescription =
            desc.length > 0 &&
            desc !== normalise(v.name) &&
            desc !== normalise(v.role ?? "");

          return (
            <Reveal
              key={v.id}
              delay={i * 0.06}
              className={cn("bg-ivory", v.large && "lg:col-span-2")}
            >
              <article className="flex h-full flex-col justify-between gap-8 p-7 transition-colors duration-500 hover:bg-sand md:p-10">
                <div>
                  <LogoMark name={v.name} logo={v.logo} size={v.large ? "lg" : "md"} />
                  <h3 className="mt-6 font-display text-display-md leading-tight text-balance">
                    {v.name}
                  </h3>
                  {v.role && (
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gold">
                      {v.role}
                    </p>
                  )}
                  {showDescription && (
                    <p className="mt-4 max-w-md text-stone">{v.description}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {actions.map((a) => (
                    <ActionLink key={a.href + a.label} action={a} />
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
