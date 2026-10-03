import { ArrowUpRight } from "lucide-react";

import type { Action } from "@/lib/types";
import { cn } from "@/lib/utils";
import { KindIcon } from "./kind-icon";

type Variant = "solid" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  solid: "bg-gold text-ink hover:bg-ivory",
  outline: "border border-current/30 hover:border-gold hover:text-gold",
  ghost: "text-gold hover:text-current",
};

export function ActionLink({
  action,
  variant = "outline",
  className,
  icon = true,
}: {
  action: Pick<Action, "href" | "label" | "kind" | "external">;
  variant?: Variant;
  className?: string;
  icon?: boolean;
}) {
  const ext = action.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={action.href}
      {...ext}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      {icon && <KindIcon kind={action.kind} className="size-3.5" />}
      {action.label}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
