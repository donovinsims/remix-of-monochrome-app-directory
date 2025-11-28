import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  type: 'card' | 'grid' | 'detail';
  count?: number;
}

/**
 * LoadingState component with Skeleton loading states
 * Updated with Atomize Design System
 */
export function LoadingState({ type, count = 6 }: LoadingStateProps) {
  if (type === 'detail') {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="flex items-start gap-6">
            <Skeleton className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[var(--atomize-primary-100)] to-[var(--atomize-secondary-100)] dark:from-[var(--atomize-primary-900)]/30 dark:to-[var(--atomize-secondary-900)]/30" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-2/3 bg-[var(--atomize-surface-tertiary)]" />
              <Skeleton className="h-5 w-1/3 bg-[var(--atomize-surface-tertiary)]" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-lg bg-[var(--atomize-primary-100)] dark:bg-[var(--atomize-primary-900)]/30" />
                <Skeleton className="h-6 w-20 rounded-lg bg-[var(--atomize-secondary-100)] dark:bg-[var(--atomize-secondary-900)]/30" />
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-[var(--atomize-surface-tertiary)]" />
            <Skeleton className="h-4 w-full bg-[var(--atomize-surface-tertiary)]" />
            <Skeleton className="h-4 w-3/4 bg-[var(--atomize-surface-tertiary)]" />
          </div>

          {/* Stats skeleton */}
          <div className="flex gap-4">
            <Skeleton className="h-16 w-32 rounded-xl bg-gradient-to-br from-[var(--atomize-primary-100)] to-[var(--atomize-primary-200)] dark:from-[var(--atomize-primary-900)]/30 dark:to-[var(--atomize-primary-800)]/30" />
            <Skeleton className="h-16 w-32 rounded-xl bg-gradient-to-br from-[var(--atomize-secondary-100)] to-[var(--atomize-secondary-200)] dark:from-[var(--atomize-secondary-900)]/30 dark:to-[var(--atomize-secondary-800)]/30" />
            <Skeleton className="h-16 w-32 rounded-xl bg-gradient-to-br from-[var(--atomize-accent-100)] to-[var(--atomize-accent-200)] dark:from-[var(--atomize-accent-900)]/30 dark:to-[var(--atomize-accent-800)]/30" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="space-y-4 atomize-card overflow-hidden">
        <Skeleton className="aspect-[4/3] w-full rounded-t-[var(--atomize-radius-2xl)] bg-gradient-to-br from-[var(--atomize-primary-100)] via-[var(--atomize-secondary-100)] to-[var(--atomize-accent-100)] dark:from-[var(--atomize-primary-900)]/30 dark:via-[var(--atomize-secondary-900)]/30 dark:to-[var(--atomize-accent-900)]/30" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-5 w-3/4 bg-[var(--atomize-surface-tertiary)]" />
          <Skeleton className="h-4 w-1/2 bg-[var(--atomize-surface-tertiary)]" />
        </div>
      </div>
    );
  }

  // type === 'grid'
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="atomize-card overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full rounded-t-[var(--atomize-radius-2xl)] bg-gradient-to-br from-[var(--atomize-primary-100)] via-[var(--atomize-secondary-100)] to-[var(--atomize-accent-100)] dark:from-[var(--atomize-primary-900)]/30 dark:via-[var(--atomize-secondary-900)]/30 dark:to-[var(--atomize-accent-900)]/30" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4 bg-[var(--atomize-surface-tertiary)]" />
            <Skeleton className="h-4 w-1/2 bg-[var(--atomize-surface-tertiary)]" />
          </div>
        </div>
      ))}
    </div>
  );
}