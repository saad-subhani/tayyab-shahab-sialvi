export type LinkKind =
  | "website"
  | "facebook"
  | "instagram"
  | "whatsapp-channel"
  | "whatsapp"
  | "youtube"
  | "linkedin"
  | "other";

/** url === null means "not yet supplied/verified by the owner". NEVER invent a URL. */
export interface OfficialLink {
  kind: LinkKind;
  label: string;
  url: string | null;
}

export interface Action {
  label: string;
  href: string;
  kind: LinkKind;
  external: boolean;
}

export type ProjectStatus = "Current" | "Featured" | "Coming Soon";

/**
 * A supplied logo file. The intrinsic pixel size is stored so the logo plate
 * can hug the mark's real ratio without distortion or layout shift.
 */
export interface Logo {
  src: string;
  width: number;
  height: number;
}

export type GalleryCategory =
  | "Social Work"
  | "ATI"
  | "Education"
  | "Business"
  | "Media"
  | "MOUs"
  | "Events"
  | "Achievements";
