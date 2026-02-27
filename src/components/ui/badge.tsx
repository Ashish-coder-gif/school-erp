import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border border-transparent px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 text-white [a&]:hover:from-slate-800 [a&]:hover:to-slate-900",
        secondary:
          "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 [a&]:hover:bg-slate-300 dark:hover:bg-slate-600",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 dark:from-red-600/70 dark:to-red-700/70 text-white [a&]:hover:from-red-700 [a&]:hover:to-red-800 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40",
        outline:
          "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-900/50 [a&]:hover:bg-slate-100 dark:hover:bg-slate-800",
        ghost: "[a&]:hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300",
        link: "text-slate-700 dark:text-slate-300 underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
