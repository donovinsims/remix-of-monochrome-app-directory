import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils/formatting";

interface StatBadgeProps {
  icon: ReactNode;
  value: number | string;
  label?: string;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

/**
 * StatBadge component for displaying statistics like stars, downloads, etc.
 */
export function StatBadge({ 
  icon, 
  value, 
  label, 
  variant = 'default',
  className 
}: StatBadgeProps) {
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;
  
  const variantStyles = {
    default: "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
    secondary: "bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400",
    outline: "border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium",
      variantStyles[variant],
      className
    )}>
      <span className="flex items-center">
        {icon}
      </span>
      <span>{formattedValue}</span>
      {label && <span className="text-xs opacity-70">{label}</span>}
    </div>
  );
}
