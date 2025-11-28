import { cn } from "@/lib/utils";

interface TagBadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * TagBadge component for generic tags, categories, languages, platforms
 */
export function TagBadge({ 
  label, 
  variant = 'default', 
  size = 'sm',
  className 
}: TagBadgeProps) {
  const variantStyles = {
    default: "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800",
    primary: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    secondary: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    success: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800",
  };
  
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
}
