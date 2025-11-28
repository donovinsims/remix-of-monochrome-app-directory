import { cn } from "@/lib/utils";

interface TagBadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'accent' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * TagBadge component for generic tags, categories, languages, platforms
 * Updated with Atomize Design System colors
 */
export function TagBadge({ 
  label, 
  variant = 'default', 
  size = 'sm',
  className 
}: TagBadgeProps) {
  const variantStyles = {
    default: "bg-[var(--atomize-surface-tertiary)] text-[var(--atomize-text-secondary)] border-[var(--atomize-border-primary)]",
    primary: "bg-[var(--atomize-primary-100)] text-[var(--atomize-primary-700)] dark:bg-[var(--atomize-primary-900)]/40 dark:text-[var(--atomize-primary-300)] border-[var(--atomize-primary-200)] dark:border-[var(--atomize-primary-700)]",
    secondary: "bg-[var(--atomize-secondary-100)] text-[var(--atomize-secondary-700)] dark:bg-[var(--atomize-secondary-900)]/40 dark:text-[var(--atomize-secondary-300)] border-[var(--atomize-secondary-200)] dark:border-[var(--atomize-secondary-700)]",
    success: "bg-[var(--atomize-success-100)] text-[var(--atomize-success-700)] dark:bg-[var(--atomize-success-900)]/40 dark:text-[var(--atomize-success-300)] border-[var(--atomize-success-200)] dark:border-[var(--atomize-success-700)]",
    accent: "bg-[var(--atomize-accent-100)] text-[var(--atomize-accent-700)] dark:bg-[var(--atomize-accent-900)]/40 dark:text-[var(--atomize-accent-300)] border-[var(--atomize-accent-200)] dark:border-[var(--atomize-accent-700)]",
    warning: "bg-[var(--atomize-warning-100)] text-[var(--atomize-warning-700)] dark:bg-[var(--atomize-warning-900)]/40 dark:text-[var(--atomize-warning-300)] border-[var(--atomize-warning-200)] dark:border-[var(--atomize-warning-700)]",
  };
  
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg font-medium border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
}