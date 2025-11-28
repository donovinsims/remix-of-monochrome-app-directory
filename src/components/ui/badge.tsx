import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] text-white shadow-sm",
        secondary:
          "border-transparent bg-[var(--atomize-neutral-100)] text-[var(--atomize-neutral-700)] dark:bg-[var(--atomize-neutral-800)] dark:text-[var(--atomize-neutral-200)]",
        destructive:
          "border-transparent bg-gradient-to-r from-[var(--atomize-error-500)] to-[var(--atomize-error-600)] text-white",
        outline:
          "border-[var(--atomize-border-primary)] text-[var(--atomize-text-secondary)] bg-transparent",
        success:
          "border-transparent bg-gradient-to-r from-[var(--atomize-success-500)] to-[var(--atomize-success-600)] text-white",
        warning:
          "border-transparent bg-gradient-to-r from-[var(--atomize-warning-400)] to-[var(--atomize-warning-500)] text-[var(--atomize-warning-900)]",
        accent:
          "border-transparent bg-gradient-to-r from-[var(--atomize-accent-400)] to-[var(--atomize-accent-500)] text-white",
        new:
          "border-transparent bg-gradient-to-r from-[var(--atomize-secondary-400)] to-[var(--atomize-secondary-500)] text-white",
        premium:
          "border-transparent bg-gradient-to-r from-[var(--atomize-warning-500)] to-[var(--atomize-accent-500)] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }