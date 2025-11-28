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
 */
export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {Icon && (
        <div className="mb-6 p-4 rounded-full bg-zinc-100 dark:bg-zinc-900">
          <Icon className="h-12 w-12 text-zinc-400 dark:text-zinc-600" />
        </div>
      )}
      
      <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-white">
        {title}
      </h3>
      
      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {action && (
        <Button asChild className="rounded-full">
          <Link href={action.href}>
            {action.label}
          </Link>
        </Button>
      )}
    </div>
  );
}
