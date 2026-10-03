import { ActionLink } from "@/components/shared/action-link";
import { KindIcon } from "@/components/shared/kind-icon";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { contact } from "@/content/site";
import type { LinkKind } from "@/lib/types";
import { PHONE_DISPLAY, TEL_LINK, greet, waLink } from "@/lib/whatsapp";
import { ContactForm } from "./contact-form";

export function Connect() {
  const socials = contact.socials.filter((s) => s.url);

  return (
    <Section id="connect" tone="ivory">
      <SectionHeading index="10" eyebrow="Connect" title="Let’s talk." />

      <div className="grid gap-20 lg:grid-cols-2">
        <Reveal>
          <dl className="space-y-10">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-stone">
                Phone / WhatsApp
              </dt>
              <dd className="mt-3">
                <a
                  href={TEL_LINK}
                  className="font-display text-display-lg transition-colors hover:text-gold"
                >
                  {PHONE_DISPLAY}
                </a>
              </dd>
            </div>

            {contact.email && (
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-stone">Email</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-display text-display-md transition-colors hover:text-gold"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            )}

            <div>
              <dt className="mb-4 text-xs uppercase tracking-[0.16em] text-stone">
                Social media
              </dt>
              <dd className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold"
                  >
                    <KindIcon kind={s.kind as LinkKind} />
                  </a>
                ))}
                <a
                  href={waLink(greet("I would like to connect with you."))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold"
                >
                  <KindIcon kind="whatsapp" />
                </a>
              </dd>
            </div>
          </dl>

          <ActionLink
            className="mt-12"
            variant="solid"
            action={{
              label: "Message Tayyab Shahab on WhatsApp",
              href: waLink(greet("I would like to connect with you.")),
              kind: "whatsapp",
              external: true,
            }}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
