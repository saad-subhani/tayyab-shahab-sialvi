import { cn } from "@/lib/utils";

const tones = {
  ivory: "bg-ivory text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-ivory",
} as const;

export type SectionTone = keyof typeof tones;

export function Section({
  id,
  tone = "ivory",
  className,
  innerClassName,
  grain = false,
  children,
}: {
  id: string;
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  grain?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 md:py-32",
        tones[tone],
        grain && "grain",
        className,
      )}
    >
      <div className={cn("relative mx-auto max-w-7xl px-6 md:px-10", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
