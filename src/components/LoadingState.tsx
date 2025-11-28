import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  type: 'card' | 'grid' | 'detail';
  count?: number;
}

/**
 * LoadingState component with Skeleton loading states
 */
export function LoadingState({ type, count = 6 }: LoadingStateProps) {
  if (type === 'detail') {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="flex items-start gap-6">
            <Skeleton className="h-24 w-24 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Stats skeleton */}
          <div className="flex gap-4">
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-16 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="space-y-4">
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  // type === 'grid'
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
