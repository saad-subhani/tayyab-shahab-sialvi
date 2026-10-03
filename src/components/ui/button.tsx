import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-ivory hover:bg-gold hover:text-ink",
        gold: "bg-gold text-ink hover:bg-ivory",
        outline:
          "border border-current/25 bg-transparent hover:border-gold hover:text-gold",
        ghost: "bg-transparent text-gold hover:text-current",
        link: "h-auto rounded-none p-0 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 rounded-full px-7 text-xs uppercase tracking-[0.16em]",
        sm: "h-9 rounded-full px-4 text-[11px] uppercase tracking-[0.14em]",
        lg: "h-14 rounded-full px-9 text-xs uppercase tracking-[0.16em]",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
