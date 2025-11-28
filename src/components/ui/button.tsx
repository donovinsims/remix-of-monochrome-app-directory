import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[var(--atomize-primary-600)] to-[var(--atomize-primary-700)] text-white shadow-md hover:shadow-lg hover:shadow-[var(--atomize-primary-500)]/25 hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-gradient-to-r from-[var(--atomize-error-500)] to-[var(--atomize-error-600)] text-white shadow-md hover:shadow-lg hover:shadow-[var(--atomize-error-500)]/25",
        outline:
          "border-2 border-[var(--atomize-border-primary)] bg-transparent hover:bg-[var(--atomize-primary-50)] hover:border-[var(--atomize-primary-300)] hover:text-[var(--atomize-primary-700)] dark:hover:bg-[var(--atomize-primary-900)]/30 dark:hover:border-[var(--atomize-primary-500)]",
        secondary:
          "bg-[var(--atomize-secondary-100)] text-[var(--atomize-secondary-700)] hover:bg-[var(--atomize-secondary-200)] dark:bg-[var(--atomize-secondary-800)] dark:text-[var(--atomize-secondary-200)] dark:hover:bg-[var(--atomize-secondary-700)]",
        ghost:
          "hover:bg-[var(--atomize-primary-50)] hover:text-[var(--atomize-primary-700)] dark:hover:bg-[var(--atomize-primary-900)]/30 dark:hover:text-[var(--atomize-primary-300)]",
        link: "text-[var(--atomize-primary-600)] underline-offset-4 hover:underline dark:text-[var(--atomize-primary-400)]",
        accent:
          "bg-gradient-to-r from-[var(--atomize-accent-500)] to-[var(--atomize-accent-600)] text-white shadow-md hover:shadow-lg hover:shadow-[var(--atomize-accent-500)]/25 hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-lg gap-1.5 px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        xl: "h-14 rounded-2xl px-8 text-lg",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }