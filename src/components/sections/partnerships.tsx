import { ActionLink } from "@/components/shared/action-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { mou } from "@/content/site";
import { getActions } from "@/lib/actions";

export function Partnerships() {
  const actions = getActions(mou.partnerLinks, mou.waMessage, "Partner with us");
  const slots = Math.max(3, mou.photos.length);

  return (
    <Section id="partnerships" tone="ivory">
      <SectionHeading index="07" eyebrow="MOU & Partnerships" title="Partnerships & MOUs" />

      <Reveal>
        <article className="border border-line p-8 md:p-14">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">
            Digital Skills Program
          </p>
          <h3 className="mt-4 max-w-3xl font-display text-display-lg leading-tight text-balance">
            {mou.title}
          </h3>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <h4 className="mb-6 text-xs uppercase tracking-[0.18em] text-stone">
                {mou.participantsLabel}
              </h4>
              <ul className="space-y-6">
                {mou.participants.map((p) => (
                  <li key={p.name} className="flex items-center gap-5">
                    <LogoMark name={p.name} logo={null} />
                    <div>
                      <p className="font-display text-display-sm leading-tight">{p.name}</p>
                      <p className="text-sm text-stone">{p.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-xs uppercase tracking-[0.18em] text-stone">
                {mou.relatedLabel}
              </h4>
              <ul className="divide-y divide-line border-y border-line">
                {mou.related.map((p) => (
                  <li key={p.name} className="py-4">
                    <p className="font-display text-lg leading-snug">{p.name}</p>
                    <p className="text-sm text-stone">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual MOU gallery — placeholder tiles until photos arrive */}
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: slots }).map((_, i) => {
              const photo = mou.photos[i];

              return (
                <div
                  key={i}
                  className="flex aspect-4/3 items-center justify-center border border-dashed border-line bg-sand text-xs uppercase tracking-[0.16em] text-stone"
                >
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.src} alt={photo.alt} className="size-full object-cover" />
                  ) : (
                    "MOU photo"
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((a) => (
              <ActionLink key={a.href + a.label} action={a} variant="solid" />
            ))}
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
