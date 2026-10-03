import { ActionLink } from "@/components/shared/action-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { platforms } from "@/content/site";
import { getActions } from "@/lib/actions";

export function Platforms() {
  return (
    <Section id="platforms" tone="ivory">
      <SectionHeading
        index="09"
        eyebrow="Official Links"
        title="Official platforms, in one place"
        description="Verified official websites and social accounts for every organization and project."
      />

      <ul className="grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p, i) => {
          // each org gets its own fallback wording — six identical
          // "Enquire on WhatsApp" chips in a row read as a broken widget.
          const actions = getActions(p.links, p.waMessage, `Get ${p.name} links`);

          return (
            <Reveal key={p.id} as="li" delay={i * 0.05} className="bg-ivory">
              <article className="flex h-full flex-col justify-between gap-10 bg-ivory p-7 transition-colors duration-500 hover:bg-sand md:p-10">
                <div>
                  <LogoMark name={p.name} logo={p.logo} size="md" />
                  <h3 className="mt-6 font-display text-display-sm leading-tight text-balance">
                    {p.name}
                  </h3>
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
      </ul>
    </Section>
  );
}
