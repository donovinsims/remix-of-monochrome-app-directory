import { LoadingState } from "@/components/LoadingState";
import { Skeleton } from "@/components/ui/skeleton";

export default function MCPsLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20">
      {/* Hero Skeleton */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Skeleton className="h-8 w-64 rounded-full mb-6" />
            <Skeleton className="h-16 w-full max-w-xl mb-6" />
            <Skeleton className="h-8 w-full max-w-lg mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <Skeleton className="h-10 w-full md:w-96" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>

          <LoadingState type="grid" count={8} />
        </div>
      </div>
    </div>
  );
}
