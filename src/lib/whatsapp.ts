export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923074891612";

export const PHONE_DISPLAY = "0307-4891612";

export const TEL_LINK = `tel:+${WHATSAPP_NUMBER}`;

/** Build a wa.me link with an optional pre-filled message. */
export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Standard greeting used across the site. */
export const greet = (about: string) => `Assalam o Alaikum, ${about}`;

/** Generic message used by the persistent header / floating WhatsApp button. */
export const GENERAL_ENQUIRY = greet(
  "I visited your website and would like to connect.",
);
