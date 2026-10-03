import { ArrowUpRight, Globe } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

import type { LinkKind } from "@/lib/types";

export function KindIcon({ kind, className }: { kind: LinkKind; className?: string }) {
  const c = className ?? "size-4";

  switch (kind) {
    case "facebook":
      return <FaFacebookF className={c} />;
    case "instagram":
      return <FaInstagram className={c} />;
    case "linkedin":
      return <FaLinkedinIn className={c} />;
    case "youtube":
      return <FaYoutube className={c} />;
    case "whatsapp":
    case "whatsapp-channel":
      return <FaWhatsapp className={c} />;
    case "website":
      return <Globe className={c} strokeWidth={1.5} />;
    default:
      return <ArrowUpRight className={c} strokeWidth={1.5} />;
  }
}
