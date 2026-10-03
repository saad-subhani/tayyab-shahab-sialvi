import { ArrowUp } from "lucide-react";

import { ActionLink } from "@/components/shared/action-link";
import { nav, site } from "@/content/site";
import { GENERAL_ENQUIRY, PHONE_DISPLAY, TEL_LINK, waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink pb-10 pt-20 text-ivory">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <p className="font-display text-3xl leading-none">
              TS<span className="text-gold">.</span>
            </p>
            <p className="mt-4 font-display text-display-sm leading-tight">{site.name}</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/60">
              {site.purpose}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={TEL_LINK}
                className="font-display text-[1.375rem] transition-colors hover:text-gold"
              >
                {PHONE_DISPLAY}
              </a>
              <ActionLink
                variant="ghost"
                icon
                action={{
                  label: "WhatsApp",
                  href: waLink(GENERAL_ENQUIRY),
                  kind: "whatsapp",
                  external: true,
                }}
              />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-ivory/70 transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-gold"
            >
              <ArrowUp className="size-3.5" strokeWidth={1.5} /> Back to top
            </a>
          </nav>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
