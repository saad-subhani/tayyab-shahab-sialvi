import Image from "next/image";

import type { Logo } from "@/lib/types";
import { cn } from "@/lib/utils";

/** padding / mark height / monogram diameter, per size step.
 *  Plate height = mark + padding, matched to the monogram diameter (36 / 48 / 64). */
const PLATE = { sm: "p-1.5", md: "p-2", lg: "p-2.5" } as const;
const MARK = { sm: "h-6", md: "h-8", lg: "h-11" } as const;
const MONOGRAM = { sm: "size-9 text-xs", md: "size-12 text-lg", lg: "size-16 text-2xl" } as const;
const SIZES = { sm: "96px", md: "144px", lg: "200px" } as const;

/**
 * The owner's logo on a white plate that hugs the mark's intrinsic ratio
 * (no distortion, no layout shift), or an elegant monogram until one exists.
 */
export function LogoMark({
  name,
  logo,
  className,
  size = "md",
}: {
  name: string;
  logo: Logo | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  if (logo) {
    return (
      <span
        className={cn(
          "flex w-fit shrink-0 items-center justify-center rounded-xl border border-line bg-white shadow-[0_1px_2px_rgb(11_11_12/0.05)]",
          PLATE[size],
          className,
        )}
      >
        <Image
          src={logo.src}
          alt={`${name} logo`}
          width={logo.width}
          height={logo.height}
          sizes={SIZES[size]}
          className={cn("w-auto", MARK[size])}
        />
      </span>
    );
  }

  const initials = name
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-current/20 font-display tracking-wide",
        MONOGRAM[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
