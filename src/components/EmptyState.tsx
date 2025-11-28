import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    href: string;
  };
}

/**
 * EmptyState component for displaying "No results found" states
 * Updated with Atomize Design System
 */
export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {Icon && (
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-[var(--atomize-primary-100)] to-[var(--atomize-secondary-100)] dark:from-[var(--atomize-primary-900)]/40 dark:to-[var(--atomize-secondary-900)]/40 border border-[var(--atomize-border-primary)]">
          <Icon className="h-12 w-12 text-[var(--atomize-primary-500)]" />
        </div>
      )}
      
      <h3 className="text-2xl font-semibold mb-3 text-[var(--atomize-text-primary)]">
        {title}
      </h3>
      
      <p className="text-[var(--atomize-text-secondary)] max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {action && (
        <Button asChild className="rounded-xl bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] hover:from-[var(--atomize-primary-600)] hover:to-[var(--atomize-primary-700)] text-white shadow-md hover:shadow-lg transition-all">
          <Link href={action.href}>
            {action.label}
          </Link>
        </Button>
      )}
    </div>
  );
}