import type { Action, OfficialLink } from "./types";
import { waLink } from "./whatsapp";

/**
 * If any verified official URL exists → return those buttons.
 * Otherwise → a single WhatsApp enquiry button (never an invented URL).
 */
export function getActions(
  links: OfficialLink[] | undefined,
  waMessage: string,
  fallbackLabel = "Enquire on WhatsApp",
): Action[] {
  const verified: Action[] = (links ?? [])
    .filter((l): l is OfficialLink & { url: string } => Boolean(l.url))
    .map((l) => ({ label: l.label, href: l.url, kind: l.kind, external: true }));

  if (verified.length) return verified;

  return [
    { label: fallbackLabel, href: waLink(waMessage), kind: "whatsapp", external: true },
  ];
}
