import { ActionLink } from "@/components/shared/action-link";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { currentRoles, site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

export function Snapshot() {
  return (
    <Section id="snapshot" tone="ivory">
      <Reveal>
        <p className="mb-10 text-xs uppercase tracking-[0.18em] text-gold">
          Profile Snapshot
        </p>
        <dl className="grid gap-10 border-y border-line py-10 md:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-stone">Name</dt>
            <dd className="mt-3 font-display text-display-sm leading-tight">{site.name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-stone">
              Primary identity
            </dt>
            <dd className="mt-3 font-display text-display-sm leading-tight">
              {site.identity.join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-stone">Purpose</dt>
            <dd className="mt-3 text-sm leading-relaxed text-stone">{site.purpose}</dd>
          </div>
        </dl>
      </Reveal>

      <Reveal className="mt-20">
        <p className="mb-10 text-xs uppercase tracking-[0.18em] text-gold">
          Current Roles
        </p>
        <div className="grid gap-px overflow-hidden bg-line md:grid-cols-3">
          {currentRoles.map((r) => (
            <article
              key={r.title + r.org}
              className="flex flex-col justify-between gap-10 bg-ivory p-8 transition-colors duration-500 hover:bg-sand md:p-10"
            >
              <div>
                <h3 className="font-display text-display-md leading-tight">{r.title}</h3>
                <p className="mt-2 text-stone">{r.org}</p>
              </div>
              <ActionLink
                variant="ghost"
                icon={false}
                className="-ml-5 self-start"
                action={{
                  label: "Learn more",
                  href: waLink(r.waMessage),
                  kind: "whatsapp",
                  external: true,
                }}
              />
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
