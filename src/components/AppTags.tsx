"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AppTagsProps {
  tags: string[];
  limit?: number;
  className?: string;
}

/**
 * Display app tags with color coding
 * - 'New' → blue
 * - 'Innovative' → purple
 * - 'Editor Pick' → gold
 */
export function AppTags({ tags, limit = 3, className }: AppTagsProps) {
  if (!tags || tags.length === 0) return null;

  const displayTags = tags.slice(0, limit);

  const getTagVariant = (tag: string) => {
    const normalizedTag = tag.toLowerCase();
    
    if (normalizedTag === 'new') {
      return 'blue';
    }
    if (normalizedTag === 'innovative') {
      return 'purple';
    }
    if (normalizedTag === 'editor pick') {
      return 'gold';
    }
    return 'default';
  };

  const getTagStyles = (tag: string) => {
    const variant = getTagVariant(tag);
    
    switch (variant) {
      case 'blue':
        return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case 'purple':
        return "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case 'gold':
        return "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      default:
        return "bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800";
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
            getTagStyles(tag)
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
