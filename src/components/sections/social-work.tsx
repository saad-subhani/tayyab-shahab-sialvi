import { ActionLink } from "@/components/shared/action-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { socialWork } from "@/content/site";
import { getActions } from "@/lib/actions";

export function SocialWork() {
  const actions = getActions(socialWork.links, socialWork.waMessage, socialWork.cta);

  return (
    <Section id="social-work" tone="ivory">
      <SectionHeading
        index="02"
        eyebrow="Social Work"
        title="Current Social & Organizational Role"
      />

      <Reveal>
        <article className="grid gap-12 border border-line p-8 md:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <LogoMark name={socialWork.org} logo={socialWork.logo} size="lg" />
            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-gold">
              {socialWork.role}
            </p>
            <h3 className="mt-4 font-display text-display-lg leading-tight text-balance">
              {socialWork.org}
            </h3>
            <p className="mt-7 text-base leading-relaxed text-stone">
              <span className="text-ink">ATI work focus:</span> {socialWork.focus}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {actions.map((a) => (
                <ActionLink key={a.href} action={a} variant="solid" />
              ))}
            </div>
          </div>

          <ul className="space-y-6 self-end border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {socialWork.bullets.map((b) => (
              <li key={b} className="flex gap-4">
                <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-gold" />
                <span className="text-[15px] leading-relaxed text-ink/80">{b}</span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </Section>
  );
}
