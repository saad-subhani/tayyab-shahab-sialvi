import { ActionLink } from "@/components/shared/action-link";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { comingSoon } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

export function ComingSoon() {
  return (
    <Section id="coming-soon" tone="ink" grain>
      <Reveal className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-gold">Coming Soon</p>
          <p className="max-w-2xl font-display text-display-lg leading-tight text-balance">
            {comingSoon.title}
          </p>
        </div>
        <ActionLink
          variant="solid"
          action={{
            label: "Get notified on WhatsApp",
            href: waLink(comingSoon.waMessage),
            kind: "whatsapp",
            external: true,
          }}
        />
      </Reveal>
    </Section>
  );
}
