import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl md:mb-16", className)}>
      <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-gold">
        {index && <span>{index}</span>}
        <span className="h-px w-12 bg-gold/60" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="font-display text-display-lg leading-[1.1] tracking-[-0.01em] text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-current/70">
          {description}
        </p>
      )}
    </Reveal>
  );
}
