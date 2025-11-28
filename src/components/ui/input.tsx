import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-[var(--atomize-text-tertiary)] selection:bg-[var(--atomize-primary-200)] selection:text-[var(--atomize-primary-900)] dark:selection:bg-[var(--atomize-primary-700)] dark:selection:text-[var(--atomize-primary-100)] border-[var(--atomize-border-primary)] bg-[var(--atomize-surface-elevated)] flex h-11 w-full min-w-0 rounded-xl border px-4 py-2.5 text-base shadow-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-[var(--atomize-primary-400)] focus:ring-2 focus:ring-[var(--atomize-primary-200)] dark:focus:ring-[var(--atomize-primary-800)] hover:border-[var(--atomize-primary-300)]",
        "aria-invalid:ring-[var(--atomize-error-200)] dark:aria-invalid:ring-[var(--atomize-error-800)] aria-invalid:border-[var(--atomize-error-500)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }